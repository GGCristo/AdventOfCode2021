import * as fs from 'fs'

type point = {
  x: number,
  y: number,
}

type ventLine = {
  endpoint1: point,
  endpoint2: point,
}

function minmax(a: number, b: number): [number, number] {
  if (a < b) {
    return [a, b]
  }
  return [b, a]
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

function run(ventLines: ventLine[], matrix: number[][]) :number {
  let overlapping = 0
  for (let ventLine of ventLines) {
    if (ventLine.endpoint1.x === ventLine.endpoint2.x) {
      let [yIter, yEnd] = minmax(ventLine.endpoint1.y, ventLine.endpoint2.y) 
      for (; yIter <= yEnd; yIter++) {
        matrix[yIter][ventLine.endpoint1.x]++
        overlapping = matrix[yIter][ventLine.endpoint1.x] === 2 ? overlapping+1: overlapping
      }
    } else if (ventLine.endpoint1.y === ventLine.endpoint2.y) {
      let [xIter, xEnd] = minmax(ventLine.endpoint1.x, ventLine.endpoint2.x)
      for (; xIter <= xEnd; xIter++) {
        matrix[ventLine.endpoint1.y][xIter]++
        overlapping = matrix[ventLine.endpoint1.y][xIter] === 2 ? overlapping+1: overlapping
      }
    } else {
      let [iter, iterEnd] = ventLine.endpoint1.x < ventLine.endpoint2.x ?
        [ventLine.endpoint1, ventLine.endpoint2] :
        [ventLine.endpoint2, ventLine.endpoint1]
      if (iter.y > iterEnd.y) {
        for (; iter.x <= iterEnd.x && iter.y >= iterEnd.y; iter.x++, iter.y--) {
          matrix[iter.y][iter.x]++
          overlapping = matrix[iter.y][iter.x] === 2 ? overlapping+1: overlapping
        }
      } else {
        for (; iter.x <= iterEnd.x && iter.y <= iterEnd.y; iter.x++, iter.y++) {
          matrix[iter.y][iter.x]++
          overlapping = matrix[iter.y][iter.x] === 2 ? overlapping+1: overlapping
        }
      }
    }
  }
  return overlapping
}

function main() {
  console.log("The solution is: ", run(...readData()))
}

main()

// let iterX = ventLine.endpoint1.x
// let iterY = ventLine.endpoint1.y
// let incrementX = ventLine.endpoint1.x > ventLine.endpoint2.x ? -1 : 1
// for (; iterX !== ventLine.endpoint2.x; iterX += incrementX, iterY += -incrementX) {
//   matrix[iterY][iterX]++
//   overlapping = matrix[iterY][iterX] === 2 ? overlapping+1: overlapping
// }
