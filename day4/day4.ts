import * as fs from 'fs'
import { Board } from './board'

function main() {
  const lines = fs.readFileSync("input.txt", "utf-8").split("\n")
  const input = lines[0].split(",").map(element => parseInt(element))
  lines.shift()
  let boards: Board[] = []
  let boardRows: number[] = []
  let columnN = 0
  for (const line of lines) {
    if (line.length == 0 && boardRows.length > 0) {
      boards.push(new Board(boardRows, columnN))
      boardRows = []
    } else {
      let numbers = line.split(/\s+/).filter(element => element != "").map(element => parseInt(element))
      columnN = numbers.length
      boardRows.push(...numbers)
    }
  }
  // console.log("Part1 solution: ", part1(input,boards))
  console.log("Part2 solution: ", part2(input,boards))
}

function part1(input: number[], boards: Board[]): number {
  for (const num of input) {
    for (const board of boards) {
      let result = board.mark(num)
      if (result > 0) {
        return result
      }
    }
  }
  console.log("No solution")
  return -1
}

function part2(input: number[], boards: Board[]): number {
  let lastresult = -1 
  for (const num of input) {
    for (const board of boards) {
      let result = board.mark(num)
      if (result > 0) {
        lastresult = result
      }
    }
  }
  if (lastresult < 0) {
    console.log("No solution")
    return -1
  }
  return lastresult
}

main()
