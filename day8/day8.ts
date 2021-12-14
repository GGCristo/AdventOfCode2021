function decode(words: string[]) {
  let segments = {
    UR: '',
    DR: '',
    DL: '',
  }
  let decodedWords = new Array<string>(10)
  // 1. Calcular básicos
  for (let i = 0; i < words.length;) {
    switch (words[i].length) {
      case 2: // 1
      decodedWords[1] = words[i]
      words.splice(i, 1)
      break
      case 4: // 4
      decodedWords[4] = words[i]
      words.splice(i, 1)
      break
      case 3: // 7
      decodedWords[7] = words[i]
      words.splice(i, 1)
      break
      case 7: // 8
      decodedWords[8] = words[i]
      words.splice(i, 1)
      break
      default:
      i++
      break
    }
  }
  // 2. El de tamaño 6 que no tenga los valores de 1 es 6 y el valor faltante es UR
  for (let i = 0; i < words.length; i++) {
    if (words[i].length === 6) {
      if (!words[i].includes(decodedWords[1][0])) {
        decodedWords[6] = words[i]
        segments.UR = decodedWords[1][0]
        segments.DR = decodedWords[1][1]
        words.splice(i, 1)
        break
      }
      if (!words[i].includes(decodedWords[1][1])) {
        decodedWords[6] = words[i]
        segments.UR = decodedWords[1][1]
        segments.DR = decodedWords[1][0]
        words.splice(i, 1)
        break
      }
    }
  }
  // 3. Si length === 5 -> Si tiene DR es 5 si tiene UR es 2, si tiene los dos (1) es 3
  for (let i = 0; i < words.length;) {
    if (words[i].length === 5) {
      if (words[i].includes(segments.UR) && words[i].includes(segments.DR)) {
        decodedWords[3] = words[i]
      } else if (words[i].includes(segments.UR)) {
        decodedWords[2] = words[i]
      } else if (words[i].includes(segments.DR)) {
        decodedWords[5] = words[i]
      }
      words.splice(i, 1)
    } else {
      i++
    }
  }
  // 4. A los segmentos de 6 le resto los segmentos de 5. para obtener DL
  let DL = decodedWords[6]
  for (let charFive of decodedWords[5]) {
    DL = DL.replace(charFive, "")
  }
  segments.DL = DL
  // 5. Me queda 0 y 9. El que tenga DL debe ser el 0
  for (let i = 0; i < words.length; i++) {
    for (let char of words[i]) {
      if (char === segments.DL) {
        decodedWords[0] = words[i]
        words.splice(i, 1)
        break
      }
    }
  }
  if (words.length !== 1) {
    console.log("Error")
  }
  // 6. El que queda es el 9
  decodedWords[9] = words.pop() as string
  return decodedWords
}

function search(decodedWords: string[], value: string): number {
  for (let i = 0; i < decodedWords.length; i++) {
    if (decodedWords[i].length === value.length && new Set(decodedWords[i]).size === new Set(decodedWords[i] + value).size ) {
      return i
    }
  }
  return -1
}

let rawLines = Deno.readTextFileSync("digits.txt").split('\n')
let lines: [encodedNumbers: string, inputNumbers: string][] =
  rawLines.map(element => element.trim().split(" | ") as [string, string])
lines.pop()
let count = 0
for (let line of lines) {
  let fourDigitsValues = 0
  let decodedWords = decode(line[0].split(/\s/))
  for (let digit of line[1].split(' ')) {
    fourDigitsValues = (fourDigitsValues * 10) + search(decodedWords, digit)
  }
  count += fourDigitsValues
}
console.log("Solution: ", count)
