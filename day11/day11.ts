const directions: [number, number][] = [ 
  [-1,-1], [-1,0], [-1,1], [0,-1], [0,0], [0,1], [1,-1], [1,0], [1,1] 
]

function isOutOfBounds(data: number[][], position: [row :number, column: number]): boolean {
  if (position[0] < 0 || position[0] >= data.length) {
    return true
  }
  if (position[1] < 0 || position[1] >= data[position[0]].length) {
    return true
  }
  return false
}

function readData(): number[][] {
  const data = Deno.readTextFileSync("energyLevel.txt").split('\n').map(row => row.split('').map(Number))
  data.pop()
  return data
}

function run (data: number[][], steps: number): [totalFlash: number, firstStepEveryoneFlashed: number] {
  const naturalStep = (data: number[][]): number[][] => {
    return data.map(row => row.map(energy => energy+1))
  }
  const flash = (data: number[][], row :number, column :number, flashN: number): [number[][], number] => {
    data[row][column] = 0
    flashN++
    for (let direction of directions) {
      const [newRow, newColumn] = [row+direction[0], column+direction[1]]
      if (!isOutOfBounds(data, [newRow, newColumn]) && data[newRow][newColumn] > 0) {
        data[newRow][newColumn]++
        if (data[newRow][newColumn] > 9) {
          [data, flashN] = flash(data, newRow, newColumn, flashN)
        }
      }
    }
    return [data, flashN]
  }
  let allFlashes = 0
  let resultFlashes = 0
  let firstStepEveryoneFlashed = -1
  for (let step = 0; firstStepEveryoneFlashed === -1; step++) {
    const oldFlashN = allFlashes
    data = naturalStep(data)
    for (const [i, row] of data.entries()) {
      for (const [j, value] of row.entries()) {
        if (value > 9) {
          [data, allFlashes] = flash(data, i, j, allFlashes)
          if (step < steps) {
            resultFlashes = allFlashes
          }
        }
      }
    }
    if (firstStepEveryoneFlashed === -1 && allFlashes - oldFlashN === 100) {
      firstStepEveryoneFlashed = step + 1
    }
  }
  return [resultFlashes, firstStepEveryoneFlashed]
}

function main() {
  const data = readData()
  console.log("Solution: ", run(data, 100))
}

main()
