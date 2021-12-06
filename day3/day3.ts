import * as fs from 'fs';

type binary = (0 | 1)[]

function binaryToDecimal(binary: binary): number {
  return parseInt(binary.join(''), 2)
}

function readData(): binary[] {
  let dataRaw = fs.readFileSync("diagnostics.txt", "utf-8").split("\n")
  dataRaw.pop()
  let data: binary[]= []
  for (let line of dataRaw) {
    let row: binary = []
    for (let char of line) {
      let bit = parseInt(char)
      if (bit == 0 || bit == 1) {
        row.push(bit)
      } else {
        console.log("There is a value that is not 1 nor 0 in the file")
        return
      }
    }
    data.push(row)
  }
  return data
}

function part1(): number {
  let data = readData()
  let [gamma, epsilon] = getMostAndLeastCommonBits(data).map(element => binaryToDecimal(element))
  return gamma*epsilon
}

function part2(): number {
  let data = readData()
  let digits = data[0].length
  let oxygenData = data.slice()
  for (let i = 0; i < digits && oxygenData.length > 1; i++) {
    let mostCommon = getMostAndLeastCommonBits(oxygenData)[0]
    oxygenData = oxygenData.filter(line => line[i] == mostCommon[i])
  }
  let co2Data = data.slice()
  for (let i = 0; i < digits && co2Data.length > 1; i++) {
    let leastCommon = getMostAndLeastCommonBits(co2Data)[1]
    co2Data = co2Data.filter(line => line[i] == leastCommon[i])
  }
  return binaryToDecimal(oxygenData[0]) * binaryToDecimal(co2Data[0])
}

function getMostAndLeastCommonBits(binaries: binary[]): [binary, binary]{
  let digits = binaries[0].length
  let counts: number[] = new Array(digits).fill(0)
  for (let binary of binaries) {
    for (let i = 0; i < binary.length; i++) {
      if (binary[i] == 0) {
        counts[i]--
      } else if (binary[i] == 1) {
        counts[i]++
      } else {
        console.log("Internal error, this should not happend")
      }
    }
  }
  let mostCommonBits: binary = []
  let leastCommonBits: binary = []
  for (let count of counts) {
    if (count >= 0) {
      mostCommonBits.push(1)
      leastCommonBits.push(0)
    } else {
      mostCommonBits.push(0)
      leastCommonBits.push(1)
    }
  }
  return [mostCommonBits, leastCommonBits]
}

function main() {
  console.log("Part1 result: ", part1())
  console.log("Part2 result: ", part2())
}

main()
