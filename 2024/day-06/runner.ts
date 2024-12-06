import { part1, part2 } from "./logic.js"

const input = await Bun.file(`inputs/puzzle.txt`).text()
console.log(`========================== Day 06 ==========================`)
console.log(`                   ${input.split("\n").length} lines in input`)
console.log(`                   Part 1: ${await part1(input)}`)
// console.log(`                   Part 2: ${await part2(input)}`)
console.log(`                   Part 2: Disabled`)
