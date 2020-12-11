const fs = require('fs')

class DayTwo {
    data: { min: number, max: number, letter: string, password: string }[]

    parseInput() {
        this.data = [];
        const data = fs.readFileSync('./data/2', 'UTF-8');
        const lines = data.split(/\r?\n/);
        
        // parse each line
        lines.forEach((line) => {
            // format: min-max letter: password
            let result = line.match(/(\d+)-(\d+)\s*([\w+]):\s*(.*)/);

            if (result) {
                this.data.push({
                    min: parseInt(result[1], 10),
                    max: parseInt(result[2], 10),
                    letter: result[3],
                    password: result[4]
                });
            }
        });
    }

    isValidPart1(letter:string, min:number, max:number, password:string) {
        let countRegex = new RegExp(letter,"g");
        let result = password.match(countRegex);

        if (result !== null) {
            return (result.length >= min && result.length <= max);
        }

        return false;
    }

    runPart1() {
        let result = 0;
        
        for (let i = 0; i < this.data.length; i++) {
            let data = this.data[i];
            if (this.isValidPart1(data.letter, data.min, data.max, data.password)) {
                result++;
            }
        }
        
        console.log("part 1: " + result)
    }

    isValidPart2(letter:string, min:number, max:number, password:string) {
        let count:number = 0;
        if (password[min-1] === letter) count++;
        if (password[max-1] === letter) count++;
        
        return count === 1;
    }

    runPart2() {
        let result = 0;
        
        for (let i = 0; i < this.data.length; i++) {
            let data = this.data[i];
            if (this.isValidPart2(data.letter, data.min, data.max, data.password)) {
                result++;
            }
        }
        
        console.log("part 2: " + result)
    }
}
  
let day = new DayTwo();
day.parseInput();
day.runPart1();
day.runPart2();

