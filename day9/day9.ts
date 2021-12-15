const BIGGEST_VALUE = 9
function checkLowPoint(heightmap: number[][], row: number, column :number): number {
  const CHECKNORTH = () => row - 1 >= 0 && heightmap[row - 1][column] <= heightmap[row][column]
  const CHECKSOUTH = () => row + 1 < heightmap.length && heightmap[row + 1][column] <= heightmap[row][column]
  const CHECKWEST = () => column - 1 >= 0 && heightmap[row][column - 1] <= heightmap[row][column]
  const CHECKEAST = () => column + 1 < heightmap[row].length && heightmap[row][column + 1] <= heightmap[row][column]
  if (CHECKNORTH() || CHECKSOUTH() || CHECKWEST() || CHECKEAST()) {
    return 0
  }
  return 1 + heightmap[row][column]
}

function part1(heightmap: number[][]): number {
  let result = 0
  for (let i = 0; i < heightmap.length; i++) {
    for (let j = 0; j < heightmap[i].length; j++) {
      result += checkLowPoint(heightmap, i, j)
    }
  }
  return result
}

/////////////////////////////////////////////////////////////////////////////////

function expand(heightmap: number[][], row: number, column: number): number {
  heightmap[row][column] = BIGGEST_VALUE + 1 // Mark as visited
  let sum = 1 
  const CHECKNORTH = () => row - 1 >= 0 && heightmap[row - 1][column] < 9
  const CHECKSOUTH = () => row + 1 < heightmap.length && heightmap[row + 1][column] < 9
  const CHECKEAST = () => column + 1 < heightmap[row].length && heightmap[row][column + 1] < 9
  const CHECKWEST = () => column - 1 >= 0 && heightmap[row][column - 1] < 9
  if (CHECKNORTH()) {
    sum += expand(heightmap, row - 1, column)
  }
  if (CHECKEAST()) {
    sum += expand(heightmap, row, column + 1)
  }
  if (CHECKSOUTH()) {
    sum += expand(heightmap, row + 1, column)
  }
  if (CHECKWEST()) {
    sum += expand(heightmap, row, column - 1)
  }
  return sum
}

function addToBiggestThree(biggestThree: [number, number, number], basinSize: number) {
  let swapValue = basinSize
  for (let i = 2; i >= 0; i--) {
    if (biggestThree[i] < swapValue) {
      [biggestThree[i], swapValue] = [swapValue, biggestThree[i]]
    }
  }
}

function part2(heightmap: number[][]): number {
  let biggestThree: [smallest :number, mid: number, biggest: number] = [0, 0, 0]
  let copyHeighmap = heightmap.map(row => row.slice())
  for (let row = 0; row < copyHeighmap.length; row++) {
    for (let column = 0; column < copyHeighmap[row].length; column++) {
      if (copyHeighmap[row][column] < BIGGEST_VALUE) {
        const basinSize = expand(copyHeighmap, row, column)
        addToBiggestThree(biggestThree, basinSize)
      }
    }
  }
  return biggestThree[0] * biggestThree[1] * biggestThree[2]
}

function main() {
  const heightmap = Deno.readTextFileSync("heightmap.txt").split('\n').map(row => row.split('').map(Number))
  heightmap.pop()
  console.log("Solution part 1: ", part1(heightmap))
  console.log("Solution part 2: ", part2(heightmap))
}

main()
