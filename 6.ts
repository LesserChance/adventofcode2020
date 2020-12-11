import { groupCollapsed } from "console";

const fs = require('fs')

class DaySix {
    data: Array<Array<string>> = []

    parseInput() {
        this.data = [];
        const data = fs.readFileSync('./data/6', 'UTF-8');
        const lines = data.split(/\r?\n/);
        
        // parse each line
        let group:string[] = [];
        lines.forEach((line) => {
            if (line.length > 0) {
                group.push(line);
            } else {
                this.data.push(group);
                group = [];
            }
        });
    }

    getUniqueAnswersPart1(group) {
        let answers = {}

        for (let i = 0; i < group.length; i++) {
            for (let j = 0; j < group[i].length; j++) {
                answers[group[i][j]] = 1;
            }
        }

        return Object.keys(answers).length;
    }

    runPart1() {
        let result = 0;

        for (let i = 0; i < this.data.length; i++) {
            result += this.getUniqueAnswersPart1(this.data[i]);
        }

        console.log("part 1: " + result)
    }

    getUniqueAnswersPart2(group) {
        let answers = {}

        for (let i = 0; i < group.length; i++) {
            let compare = group[i][0];
            for (let j = 0; j < group[i].length; j++) {
                if (typeof answers[group[i][j]] === 'undefined') {
                    answers[group[i][j]] = 0;
                }
                answers[group[i][j]] += 1;
            }
        }

        let result = 0;
        let q = Object.keys(answers);
        for (let i = 0; i < q.length; i++) {
            if (answers[q[i]] === group.length) {
                result++;
            }
        }

        return result;
    }

    runPart2() {
        let result = 0;

        for (let i = 0; i < this.data.length; i++) {
            result += this.getUniqueAnswersPart2(this.data[i]);
        }
        
        console.log("part 2: " + result)
    }
}
  
let day = new DaySix();
day.parseInput();
day.runPart1();
day.runPart2();

