import { stringify } from "querystring";

const fs = require('fs')

interface Passport {
    isEmpty:boolean,
    byr?:string,
    iyr?:string,
    eyr?:string,
    hgt?:string,
    hcl?:string,
    ecl?:string,
    pid?:string,
    cid?:string
}

class DayFour {
    data: Passport[] = []

    parseInput() {
        const data = fs.readFileSync('./data/4', 'UTF-8');
        const lines = data.split(/\r?\n/);
        
        // parse each line
        let passport = {isEmpty: true};
        lines.forEach((line) => {
            if (line.length === 0) {
                if (!passport.isEmpty) {
                    this.data.push(passport);
                    passport = {isEmpty: true};
                }
            } else {
                passport.isEmpty = false;
                let line_data = line.split(" ");
                for (let i = 0; i < line_data.length; i++) {
                    let passport_data = line_data[i].split(":");
                    passport[passport_data[0]] = passport_data[1];
                }
            }
        });
    }

    isValidPassportPart1(passport:Passport) {
        return (
            typeof passport.byr !== 'undefined' &&
            typeof passport.iyr !== 'undefined' &&
            typeof passport.eyr !== 'undefined' &&
            typeof passport.hgt !== 'undefined' &&
            typeof passport.hcl !== 'undefined' &&
            typeof passport.ecl !== 'undefined' &&
            typeof passport.pid !== 'undefined'
        );
    }

    runPart1() {
        let result = 0;

        for (let i = 0; i < this.data.length; i++) {
            if (this.isValidPassportPart1(this.data[i])) {
                result++;
            }
        }
        
        console.log("part 1: " + result)
    }

    isValidPassportPart2(passport:Passport) {
        if (!this.isValidPassportPart1(passport)) {
            return false;
        }

        // byr (Birth Year) - four digits; at least 1920 and at most 2002.
        if (parseInt(passport.byr, 10) < 1920 || parseInt(passport.byr, 10) > 2002) {
            return false;
        }

        // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
        if (!passport.iyr.match(/(\d{4})/) || parseInt(passport.iyr, 10) < 2010 || parseInt(passport.iyr, 10) > 2020) {
            return false;
        }

        // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
        if (!passport.eyr.match(/(\d{4})/) || parseInt(passport.eyr, 10) < 2020 || parseInt(passport.eyr, 10) > 2030) {
            return false;
        }

        // hgt (Height) - a number followed by either cm or in:
        //     If cm, the number must be at least 150 and at most 193.
        //     If in, the number must be at least 59 and at most 76.
        let cm_result = passport.hgt.match(/(\d+)cm/);
        let in_result = passport.hgt.match(/(\d+)in/);
        if (cm_result === null && in_result === null) {
            return false;
        }
        if (cm_result !== null && (parseInt(cm_result[1], 10) < 150 || parseInt(cm_result[1], 10) > 193)) {
            return false;
        }
        if (in_result !== null && (parseInt(in_result[1], 10) < 59 || parseInt(in_result[1], 10) > 76)) {
            return false;
        }

        // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
        if (!passport.hcl.match(/\#([0-9a-f]{6})/)) {
            return false;
        }

        // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
        if (['amb','blu','brn','gry','grn','hzl','oth'].indexOf(passport.ecl) === -1 ) {
            return false;
        }

        // pid (Passport ID) - a nine-digit number, including leading zeroes.
        if (!passport.pid.match(/^(\d{9})$/)) {
            return false;
        }

        return true;
    }

    runPart2() {
        let result = 0;

        for (let i = 0; i < this.data.length; i++) {
            if (this.isValidPassportPart2(this.data[i])) {
                // console.log(this.data[i]);
                result++;
            }
        }
        
        console.log("part 2: " + result)
    }
}
  
let day = new DayFour();
day.parseInput();
day.runPart1();
day.runPart2();

