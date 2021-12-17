const points1: Record<string, number> = Object.freeze({
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
})

const points2: Record<string, number> = Object.freeze({
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
})

const pairs: Record<string, string> = Object.freeze({
  "{": "}",
  "}": "{",
  "(": ")",
  ")": "(",
  "]": "[",
  "[": "]",
  "<": ">",
  ">": "<",
})

function readData(): string[] {
  let lines = Deno.readTextFileSync("navigationMap.txt").split("\n")
  lines.pop()
  return lines
}

function isOpen(symbol: string): boolean {
  return ["(", "[", "{", "<"].includes(symbol)
}

function checkCorrupted(line: string): number {
  let stack: string[] = []
  for (let char of line) {
    if (isOpen(char)) {
      stack.push(char)
    } else if (stack[stack.length-1] !== pairs[char]) {
      return points1[char]
    } else {
      stack.pop()
    }
  }
  return 0
}

function checkIncomplete(line: string): number {
  let stack: string[] = []
  for (let char of line) {
    if (isOpen(char)) {
      stack.push(char)
    } else if (stack[stack.length-1] === pairs[char]) {
      stack.pop()
    }
  }
  stack = stack.map(element => pairs[element]).reverse()
  let score = 0
  for (let symbol of stack) {
    score *= 5
    score += points2[symbol]
  }
  return score
}

function main() {
  const data = readData()
  let scorePart1 = 0
  let scoresPart2: number[] = []
  for (const line of data) {
    const resultCorrupted = checkCorrupted(line)
    scorePart1 += resultCorrupted
    if (resultCorrupted === 0) {
      scoresPart2.push(checkIncomplete(line))
    }
  }
  scoresPart2 = scoresPart2.sort((a, b) => a - b)
  console.log("Part1: ", scorePart1)
  console.log("Part2: ", scoresPart2[Math.trunc(scoresPart2.length/2)])
}

main()
