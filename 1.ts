const fs = require('fs')

class DayOne {
    data: Array<number>

    parseInput() {
        this.data = [];
        const data = fs.readFileSync('./data/1', 'UTF-8');
        const lines = data.split(/\r?\n/);
        
        // parse each line
        lines.forEach((line) => {
            this.data.push(parseInt(line, 10));
        });
        
        this.data.sort((n1,n2) => n1 - n2);
    }

    runPart1() {
        let result = null;
        
        for (let i = 0; i < this.data.length && result === null; i++) {
            for (let j = this.data.length - 1; j >= 0 && result === null ; j--) {
                if (i != j) {
                    let sum = this.data[i] + this.data[j];
                    if (sum == 2020) {
                        result = (this.data[i] * this.data[j]);
                    }
                }
            }
        }
        
        console.log("answer: " + result)
    }

    runPart2() {
        let result = null;
        
        for (let i = 0; i < this.data.length && result === null; i++) {
            for (let j = this.data.length - 1; j >= 0 && result === null ; j--) {
                for (let k = 0; k < this.data.length && result === null; k++) {
                    if (i != j && i != k && j != k) {
                        let sum = this.data[i] + this.data[j] + this.data[k];
                        if (sum == 2020) {
                            result = (this.data[i] * this.data[j] * this.data[k]);
                        }
                    }
                }
            }
        }
        
        console.log("answer: " + result)
    }
}
  
let day = new DayOne();
day.parseInput();
day.runPart1();
day.runPart2();