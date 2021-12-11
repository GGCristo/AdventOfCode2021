import * as fs from 'fs'

const DAYS = 256
const CICLE = 8
const RESET_VALUE = 6

function readData(): number[] {
  let input = fs.readFileSync("nearbyLanternfish.txt", "utf-8").split(",")
  let fishNumbersByCicle = new Array(CICLE+1).fill(0)
  for (let i of input) {
    fishNumbersByCicle[parseInt(i)]++
  }
  return fishNumbersByCicle
}

function main() {
  const fishNumbersByCicle = readData()
  for (let day = 0; day < DAYS; day++) {
    const newBornsNumber = fishNumbersByCicle.shift()
    if (newBornsNumber !== undefined) {
      fishNumbersByCicle.push(newBornsNumber)
      fishNumbersByCicle[RESET_VALUE] += newBornsNumber
    } else {
      console.log("Internal error")
      return
    }
  }
  console.log(fishNumbersByCicle.reduce((count, element) => count + element))
}

main()
