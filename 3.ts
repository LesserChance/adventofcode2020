const fs = require('fs')

class DayThree {
    data: Array<boolean>[] = []
    width: number = 0

    parseInput() {
        const data = fs.readFileSync('./data/3', 'UTF-8');
        const lines = data.split(/\r?\n/);
        
        // parse each line
        lines.forEach((line) => {
            if (line.length > 0){
                if (this.width === 0) {
                    this.width = line.length;
                }

                let result:boolean[] = [];
                for (let i = 0; i < line.length; i++) {
                    result[i] = (line.charAt(i) === ".")
                }
                this.data.push(result);
            } 
        });
    }

    treeCount(incX:number, incY:number) {
        let result = 0;
        let curX = 0;
        let curY = 0;

        for (curY = 0; curY < this.data.length; curY+=incY) {
            if (!this.data[curY][curX]) {
                result++;
            }

            curX += incX;
            curX = curX % this.width
        }

        return result;
    }

    runPart1() {
        console.log("part 1: " + this.treeCount(3,1))
    }

    runPart2() {
        let result = 1;
        result = result * this.treeCount(1,1);
        result = result * this.treeCount(3,1);
        result = result * this.treeCount(5,1);
        result = result * this.treeCount(7,1);
        result = result * this.treeCount(1,2);
        console.log("part 2: " + result)
    }
}
  
let day = new DayThree();
day.parseInput();
day.runPart1();
day.runPart2();

