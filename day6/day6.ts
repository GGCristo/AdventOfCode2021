import * as fs from 'fs'

const DAYS = 256
const CICLE = 8
const RESET_VALUE = 6

function readData(): number[] {
  let input = fs.readFileSync("nearbyLanternfish.txt", "utf-8").split(",")
  let fishNumbers = new Array(CICLE+1).fill(0)
  for (let i of input) {
    fishNumbers[parseInt(i)]++
  }
  return fishNumbers
}

function main() {
  const fishNumbers = readData()
  for (let day = 0; day < DAYS; day++) {
    const newBornsNumber = fishNumbers.shift()
    if (newBornsNumber !== undefined) {
      fishNumbers.push(newBornsNumber)
      fishNumbers[RESET_VALUE] += newBornsNumber
    } else {
      console.log("Internal error")
      return
    }
  }
  console.log(fishNumbers.reduce((count, element) => count + element))
}

main()
