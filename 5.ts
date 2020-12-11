const fs = require('fs')

class DayFive {
    data: {id:number, rowLoc: string, colLoc:string, row:number, col:number}[] = []

    getBinaryVal(locString:string,upperChar:string,lowerChar:string) {
        let pow = locString.length;
        let min = 0;
        let max = Math.pow(2,pow) - 1;

        for (let i = 0; i < locString.length; i++) {
            max -= ((locString.charAt(i) === upperChar) ? 0 : (Math.pow(2,pow-1)));
            min += ((locString.charAt(i) === lowerChar) ? 0 : (Math.pow(2,pow-1)));
            pow--;
        }

        return min;
    }

    getSeatID(row:number,col:number) {
        return (row * 8) + col;
    }

    parseInput() {
        this.data = [];
        const data = fs.readFileSync('./data/5', 'UTF-8');
        const lines = data.split(/\r?\n/);
        
        // parse each line
        lines.forEach((line) => {
            if (line.length > 0) {
                //The first 7 characters will either be F or B; these specify exactly one of the 128 rows on the plane (numbered 0 through 127). Each letter tells you which half of a region the given seat is in. Start with the whole list of rows; the first letter indicates whether the seat is in the front (0 through 63) or the back (64 through 127). The next letter indicates which half of that region the seat is in, and so on until you're left with exactly one row.
                let rowLoc:string = line.substring(0,7);
                let colLoc:string = line.substring(7);
                let row = this.getBinaryVal(rowLoc, 'B', 'F');
                let col = this.getBinaryVal(colLoc, 'R', 'L');

                this.data.push({
                    id: this.getSeatID(row, col),
                    rowLoc: rowLoc,
                    colLoc: colLoc,
                    row: row,
                    col: col
                })
            }
        });

        this.data.sort((n1,n2) => n1.id - n2.id);
    }

    runPart1() {
        let result = this.data[this.data.length - 1].id;
        
        console.log("part 1: " + result)
    }

    runPart2() {
        let result = 0;

        let last_id = this.data[0].id - 1;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id > last_id + 1) {
                result = this.data[i].id - 1;
                break;
            }

            last_id = this.data[i].id;
        }
        
        console.log("part 2: " + result)
    }
}
  
let day = new DayFive();
day.parseInput();
day.runPart1();
day.runPart2();

