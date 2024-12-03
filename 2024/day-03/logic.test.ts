import { describe, expect, it } from "bun:test"
import { part1, part2 } from "./logic"

const expectedDay1 = 161
const expectedDay2 = 48

describe("day-03", async () => {
	const input = await Bun.file(`inputs/example.txt`).text()
	it("should read example.txt", async () => {
		expect(input).not.toBeNull()
	})
	const input2 = await Bun.file(`inputs/example2.txt`).text()
	it("should read example2.txt", async () => {
		expect(input2).not.toBeNull()
	})

	it("should pass for part 1", () => {
		expect(part1(input)).toEqual(expectedDay1)
	})

	it("should pass for part 2", () => {
		expect(part2(input2)).toEqual(expectedDay2)
	})
})
