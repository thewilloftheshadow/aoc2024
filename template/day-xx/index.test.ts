import { describe, expect, it } from "vitest"
import { readFileSync } from "fs"
import { part1, part2 } from "./index"

describe("day-xx", () => {
	const input = readFileSync(`${__dirname}/example.txt`).toString()
	it("should read example.txt", async () => {
		expect(input).not.toBeNull()
	})

	it("should pass for part 1", () => {
		expect(part1(input)).toEqual(8)
	})

	it("should pass for part 2", () => {
		expect(part2(input)).toEqual(2286)
	})
})
