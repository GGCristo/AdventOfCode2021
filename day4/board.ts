export class Board {
  private values: Record<number, boolean> = {}
  private board: number[][] = []
  private hasWin: boolean
  constructor(arr: number[], columnN: number) {
    for (const value of arr) {
      this.values[value] = false
    }
    for (let i = 0; i < arr.length;) {
      let row: number[] = []
      for (let column = 0; column < columnN; column++) {
        row.push(arr[i++])
      }
      this.board.push(row)
    }
    this.hasWin = false
  }
  mark(number: number): number {
    if (this.hasWin || this.values[number] == true || this.values[number] == undefined) {
      return -1 // That number is already marked, or doesn't exist in the board
    }
    this.values[number] = true
    for (let row = 0; row < this.board.length; row++) {
      for (let column = 0; column < this.board[row].length; column++) {
        if (this.board[row][column] == number) {
          if (this.checkBingo(row, column)) {
            this.hasWin = true
            let result = 0
            for (const value in this.values) {
              if (!this.values[value]) {
                result += parseInt(value)
              }
            }
            return result * this.board[row][column]
          }
          return 0 // just marked
        }
      }
    }
    console.log("Internal error, this situation should not happend")
    return -1
  }
  private checkBingo(row: number, column: number): boolean {
    let checkRow = function(self: Board) {
      for (let column = 0; column < self.board[row].length; column++) {
        if (!self.values[self.board[row][column]]) {
          return false
        }
      }
      return true
    }(this)
    if (!checkRow) {
      for (let row = 0; row < this.board.length; row++) {
        if (!this.values[this.board[row][column]]) {
          return false
        }
      }
    }
    return true
  }
}
