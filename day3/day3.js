"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function readData() {
    let dataRaw = fs.readFileSync("diagnostics.txt", "utf-8").split("\n");
    dataRaw.pop();
    let data = [];
    for (let line of dataRaw) {
        let row = [];
        for (let char of line) {
            let bit = parseInt(char);
            if (bit == 0 || bit == 1) {
                row.push(bit);
            }
            else {
                console.log("There is a value that is not 1 nor 0 in the file");
            }
        }
        data.push(row);
    }
    return data;
}
function part1() {
    let data = readData();
    let [gamma, epsilon] = getMostAndLeastCommonBits(data).map(element => parseInt(element.join(''), 2));
    return gamma * epsilon;
}
function part2() {
    let data = readData();
    let digits = data[0].length;
    let oxygenData = data.slice();
    for (let bit = 0; bit < digits && oxygenData.length > 1; bit++) {
        let mostCommon = getMostAndLeastCommonBits(oxygenData)[0];
        oxygenData = oxygenData.filter(line => line[bit] == mostCommon[bit]);
    }
    let co2Data = data.slice();
    for (let bit = 0; bit < digits && co2Data.length > 1; bit++) {
        let leastCommon = getMostAndLeastCommonBits(co2Data)[1];
        co2Data = co2Data.filter(line => line[bit] == leastCommon[bit]);
    }
    return parseInt(oxygenData[0].join(''), 2) * parseInt(co2Data[0].join(''), 2);
}
function getMostAndLeastCommonBits(binaries) {
    let digits = binaries[0].length;
    let counts = new Array(digits).fill(0);
    for (let binary of binaries) {
        for (let i = 0; i < binary.length; i++) {
            if (binary[i] == 0) {
                counts[i]--;
            }
            else if (binary[i] == 1) {
                counts[i]++;
            }
            else {
                console.log("Internal error, this should not happend");
            }
        }
    }
    let mostCommonBits = [];
    let leastCommonBits = [];
    for (let count of counts) {
        if (count >= 0) {
            mostCommonBits.push(1);
            leastCommonBits.push(0);
        }
        else {
            mostCommonBits.push(0);
            leastCommonBits.push(1);
        }
    }
    return [mostCommonBits, leastCommonBits];
}
function main() {
    console.log("Part1 result: ", part1());
    console.log("Part2 result: ", part2());
}
main();
