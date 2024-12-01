import { readFileSync } from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

import { part1, part2 } from "./index.js"

const run = async () => {
	const input = readFileSync(`${__dirname}/../input.txt`).toString()
	console.log(`${input.split("\n").length} lines in input`)
	console.log(`Part 1: ${part1(input)}`)
	console.log(`Part 2: ${part2(input)}`)
}

run()
