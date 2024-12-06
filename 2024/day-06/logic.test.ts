import { describe, expect, it } from "bun:test"
import { part1, part2 } from "./logic"

const expectedDay1 = 41
const expectedDay2 = 6

describe("day-06", async () => {
	const input = await Bun.file(`inputs/example.txt`).text()
	it("should read example.txt", async () => {
		expect(input).not.toBeNull()
	})

	it("should pass for part 1", async () => {
		expect(await part1(input, true)).toEqual(expectedDay1)
	})

	it("should pass for part 2", async () => {
		expect(await part2(input)).toEqual(expectedDay2)
	})
})
