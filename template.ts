const fs = require('fs')

class DayTemplate {
    data: [] = []

    parseInput() {
        const data = fs.readFileSync('./data/example', 'UTF-8');
        const lines = data.split(/\r?\n/);
        
        // parse each line
        lines.forEach((line) => {
            
        });
    }

    runPart1() {
        let result = 0;
        
        console.log("part 1: " + result)
    }

    runPart2() {
        let result = 0;
        
        console.log("part 2: " + result)
    }
}
  
let day = new DayTemplate();
day.parseInput();
day.runPart1();
day.runPart2();

