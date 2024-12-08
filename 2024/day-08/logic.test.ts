import { describe, expect, it } from "bun:test"
import { part1, part2 } from "./logic"

const expectedDay1 = 14
const expectedDay2 = 34

describe("day-08", async () => {
	const input = await Bun.file(`inputs/example.txt`).text()
	it("should read example.txt", async () => {
		expect(input).not.toBeNull()
	})

	it("should pass for part 1", () => {
		expect(part1(input)).toEqual(expectedDay1)
	})

	it("should pass for part 2", () => {
		expect(part2(input)).toEqual(expectedDay2)
	})
})
