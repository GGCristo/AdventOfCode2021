import * as fs from 'fs'
import quickselect from 'median-quickselect'

function partOne(input: number[]): number {
  const aligment = quickselect(input.slice())
  return input.map(element => Math.abs(element - aligment)).reduce((sum, element) => sum + element)
}

function cost(movements: number): number {
  return (movements * (movements + 1)) / 2
}

function partTwo(input: number[]): number {
  const farthestPosition = Math.max(...input)
  let costs: number[] = []
  for (let position = 0; position < farthestPosition; position++) {
    costs.push(input.map(element => cost(Math.abs(element - position))).reduce((sum, element) => sum + element, 0))
  }
  return Math.min(...costs)
}

function main() {
  const data = fs.readFileSync("input.txt", "utf-8").replace("\n","").split(",").map(Number)
  console.log("The part 1 solution is: ", partOne(data))
  console.log("The part 2 solution is: ", partTwo(data))
}

main()
