function checkLowPoint(heightmap: number[][], row: number, column :number): number {
  if ((row - 1 >= 0 && heightmap[row - 1][column] <= heightmap[row][column]) ||
      (row + 1 < heightmap.length && heightmap[row + 1][column] <= heightmap[row][column]) ||
      (column - 1 >= 0 && heightmap[row][column - 1] <= heightmap[row][column]) ||
      (column + 1 < heightmap[row].length && heightmap[row][column+1] <= heightmap[row][column])) {
    return 0
  }
  return 1 + heightmap[row][column]
}

const heightmap = Deno.readTextFileSync("heightmap.txt").split('\n').map(element => element.split('').map(Number))
heightmap.pop()
let result = 0
for (let i = 0; i < heightmap.length; i++) {
  for (let j = 0; j < heightmap[i].length; j++) {
    result += checkLowPoint(heightmap, i, j)
  }
}
console.log(result)
