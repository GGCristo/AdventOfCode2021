"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var DAYS = 256;
var CICLE = 8;
var RESET_VALUE = 6;
function readData() {
    var input = fs.readFileSync("nearbyLanternfish.txt", "utf-8").split(",");
    var fishNumbers = new Array(CICLE + 1).fill(0);
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var i = input_1[_i];
        fishNumbers[parseInt(i)]++;
    }
    return fishNumbers;
}
function main() {
    var fishNumbers = readData();
    for (var day = 0; day < DAYS; day++) {
        var newBornsNumber = fishNumbers.shift();
        if (newBornsNumber !== undefined) {
            fishNumbers.push(newBornsNumber);
            fishNumbers[RESET_VALUE] += newBornsNumber;
        }
        else {
            console.log("Internal error");
            return;
        }
    }
    console.log(fishNumbers.reduce(function (count, element) { return count + element; }));
}
main();
