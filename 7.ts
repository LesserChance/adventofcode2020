const fs = require('fs')

class DaySeven {
    data = {}

    parseInput() {
        const data = fs.readFileSync('./data/7', 'UTF-8');
        const lines = data.split(/\r?\n/);
        
        // parse each line
        lines.forEach((line) => {
            let result = line.match(/(\w*) (\w*) bags contain (.*)./);
            if (result) {
                let color:string = result[1] + '_' + result[2];
                let contents = {};
                let contentsList = result[3].split(",");

                for (let i = 0; i < contentsList.length; i++) {
                    let contentResult = contentsList[i].match(/(\d) (\w*) (\w*) bag(s*)/)
                    if (contentResult) {
                        contents[contentResult[2] + '_' + contentResult[3]] = parseInt(contentResult[1], 10);
                    }
                }

                this.data[color] = contents;
            }
        });
    }

    getCountForMatchPart1(parentKeys, findColor) {
        let result = 0;

        for (let i = 0; i < parentKeys.length; i++) {
            if (Object.keys(this.data[parentKeys[i]]).indexOf(findColor) !== -1) {
                result++;
            } else {
                let childResults = this.getCountForMatchPart1(Object.keys(this.data[parentKeys[i]]), findColor);

                if(childResults > 0) {
                    result++;
                }
            }
        }

        return result;
    }

    runPart1() {
        let keys = Object.keys(this.data);
        console.log("part 1: " + this.getCountForMatchPart1(keys, 'shiny_gold'))
    }

    getCountForMatchPart2(parent) {
        let result = 0;
        let child_colors = Object.keys(parent);

        for (let i = 0; i < child_colors.length; i++) {
            let child_count = parent[child_colors[i]];
            let grandchild_count = this.getCountForMatchPart2(this.data[child_colors[i]]);
            result += (child_count + (child_count * grandchild_count));
        }

        return result;
    }

    runPart2() {
        let color = 'shiny_gold';
        console.log("part 2: " + this.getCountForMatchPart2(this.data[color]))
    }
}
  
let day = new DaySeven();
day.parseInput();
day.runPart1();
day.runPart2();

