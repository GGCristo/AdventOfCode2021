import * as fs from 'fs';
function part1(): Number {
  let file = fs.readFileSync('commands.txt','utf8');
  let commands = file.split(/\n/)
  commands.pop()
  let position = {
    horizontal: 0,
    depth: 0,
  }
  for (let command of commands) {
    let split = command.split(' ')
    switch (split[0]) {
      case "forward":
        position["horizontal"] += Number(split[1])
        break
      case "down":
        position["depth"] += Number(split[1])
        break
      case "up":
        position["depth"] -= Number(split[1])
        break
      default:
        console.log("Incorrect", split[0])
        return
    }
  }
  return position["horizontal"] * position["depth"]
}

function part2(): Number {
  let file = fs.readFileSync('prueba.txt','utf8');
  let commands = file.split(/\n/)
  commands.pop()
  let position = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  }
  for (let command of commands) {
    let split = command.split(' ')
    switch (split[0]) {
      case "forward":
        position["horizontal"] += Number(split[1])
        position["depth"] += position["aim"] * Number(split[1])
        break
      case "down":
        position["aim"] += Number(split[1])
        break
      case "up":
        position["aim"] -= Number(split[1])
        break
      default:
        console.log("Incorrect", split[0])
        return
    }
  }
  return position["horizontal"] * position["depth"]

}

function main() {
  console.log("Result part1: ", part1())
  console.log("Result part2: ", part2())
}

main()
