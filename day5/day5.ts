import * as fs from 'fs'

type point = {
  x: number,
  y: number,
}

type ventLine = {
  endpoint1: point,
  endpoint2: point,
}

function readData(): [ventLine[], number[][]] {
  let lines = fs.readFileSync("./hydrotermalVents.txt", "utf-8").split("\n")
  lines.pop()
  let rowSize = 0
  let columnSize = 0
  let getEndPoint = function(endPointString: string): point {
    let xy = endPointString.split(",").map(element => parseInt(element))
    if (xy.length !== 2) {
      throw new Error("Only x and y (size 2) are accepted, number of coordinates: " + xy.length)
    }
    rowSize = xy[0] > rowSize ? xy[0] : rowSize
    columnSize = xy[1] > columnSize ? xy[1] : columnSize
    return {x: xy[0], y: xy[1]}
  }

  let ventLines: ventLine[] = []
  for (let line of lines) {
    let endpoints = line.split(/\s->\s/)
    if (endpoints.length != 2) {
      throw new Error("There is a line that doesn't have the correct format")
    }
    ventLines.push({endpoint1: getEndPoint(endpoints[0]), endpoint2: getEndPoint(endpoints[1])})
  }
  let matrix: number[][] = new Array(rowSize+1)
  .fill([])
  .map(() => new Array(columnSize+1).fill(0))
  return [ventLines, matrix]
}

function part1(ventLines: ventLine[], matrix: number[][]) :number {
  let overlapping = 0
  for (let ventLine of ventLines) {
    if (ventLine.endpoint1.x === ventLine.endpoint2.x) {
      let yIter = Math.min(ventLine.endpoint1.y, ventLine.endpoint2.y) 
      let yEnd = Math.max(ventLine.endpoint1.y, ventLine.endpoint2.y)
      for (; yIter <= yEnd; yIter++) {
        matrix[yIter][ventLine.endpoint1.x]++
        overlapping = matrix[yIter][ventLine.endpoint1.x] === 2 ? overlapping+1: overlapping
      }
    } else if (ventLine.endpoint1.y === ventLine.endpoint2.y) {
      let xIter = Math.min(ventLine.endpoint1.x, ventLine.endpoint2.x)
      let xEnd = Math.max(ventLine.endpoint1.x, ventLine.endpoint2.x)
      for (; xIter <= xEnd; xIter++) {
        matrix[ventLine.endpoint1.y][xIter]++
        overlapping = matrix[ventLine.endpoint1.y][xIter] === 2 ? overlapping+1: overlapping
      }
    } else {

    }
  }
  return overlapping
}

function main() {
  let [ventLines, matrix] = readData()
  console.log("Solution to part 1 is: ", part1(ventLines, matrix))
}

main()