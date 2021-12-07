"use strict";
exports.__esModule = true;
var fs = require("fs");
var Board = /** @class */ (function () {
    function Board(arr, columnN) {
        this.values = {};
        this.board = [];
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var value = arr_1[_i];
            this.values[value] = false;
        }
        for (var i = 0; i < arr.length;) {
            var row = [];
            for (var column = 0; column < columnN; column++) {
                row.push(arr[i++]);
            }
            this.board.push(row);
        }
        this.hasWin = false;
    }
    Board.prototype.mark = function (number) {
        if (this.hasWin || this.values[number] == true || this.values[number] == undefined) {
            return -1; // That number is already marked, or doesn't exist in the board
        }
        this.values[number] = true;
        for (var row = 0; row < this.board.length; row++) {
            for (var column = 0; column < this.board[row].length; column++) {
                if (this.board[row][column] == number) {
                    if (this.checkBingo(row, column)) {
                        this.hasWin = true;
                        var result = 0;
                        for (var value in this.values) {
                            if (!this.values[value]) {
                                result += parseInt(value);
                            }
                        }
                        return result * this.board[row][column];
                    }
                    return 0; // just marked
                }
            }
        }
        console.log("Internal error, this situation should not happend");
        return -1;
    };
    Board.prototype.checkBingo = function (row, column) {
        var checkRow = function (self) {
            for (var column_1 = 0; column_1 < self.board[row].length; column_1++) {
                if (!self.values[self.board[row][column_1]]) {
                    return false;
                }
            }
            return true;
        }(this);
        if (!checkRow) {
            for (var row_1 = 0; row_1 < this.board.length; row_1++) {
                if (!this.values[this.board[row_1][column]]) {
                    return false;
                }
            }
        }
        return true;
    };
    return Board;
}());
function main() {
    var lines = fs.readFileSync("input.txt", "utf-8").split("\n");
    var input = lines[0].split(",").map(function (element) { return parseInt(element); });
    lines.shift();
    var boards = [];
    var boardRows = [];
    var columnN = 0;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (line.length == 0 && boardRows.length > 0) {
            boards.push(new Board(boardRows, columnN));
            boardRows = [];
        }
        else {
            var numbers = line.split(/\s+/).filter(function (element) { return element != ""; }).map(function (element) { return parseInt(element); });
            columnN = numbers.length;
            boardRows.push.apply(boardRows, numbers);
        }
    }
    // console.log("Part1 solution: ", part1(input,boards))
    console.log("Part2 solution: ", part2(input, boards));
}
function part1(input, boards) {
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var num = input_1[_i];
        for (var _a = 0, boards_1 = boards; _a < boards_1.length; _a++) {
            var board = boards_1[_a];
            var result = board.mark(num);
            if (result > 0) {
                return result;
            }
        }
    }
    console.log("No solution");
    return -1;
}
function part2(input, boards) {
    var lastresult = -1;
    for (var _i = 0, input_2 = input; _i < input_2.length; _i++) {
        var num = input_2[_i];
        for (var _a = 0, boards_2 = boards; _a < boards_2.length; _a++) {
            var board = boards_2[_a];
            var result = board.mark(num);
            if (result > 0) {
                lastresult = result;
            }
        }
    }
    if (lastresult < 0) {
        console.log("No solution");
        return -1;
    }
    return lastresult;
}
main();
