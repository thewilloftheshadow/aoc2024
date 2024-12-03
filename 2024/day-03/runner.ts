import { part1, part2 } from "./logic.js"

const input = await Bun.file(`inputs/puzzle.txt`).text()
console.log(`========================== Day 03 ==========================`)
console.log(`                   ${input.split("\n").length} lines in input`)
console.log(`                   Part 1: ${part1(input)}`)
console.log(`                   Part 2: ${part2(input)}`)
