export const part1 = (input: string) => {
	const parts = input
		.matchAll(/mul\(\d+,\d+\)/g)
		.toArray()
		.map((x) => x[0].replaceAll("mul(", "").replaceAll(")", ""))

	let total = 0

	for (const part of parts) {
		const [num1, num2] = part.split(",").map((x) => Number.parseInt(x))
		total += num1 * num2
	}

	return total
}

export const part2 = (input: string) => {
	const parts = input
		.matchAll(/mul\(\d+,\d+\)/g)
		.toArray()
		.map((x) => x[0])

	let index = 0
	let shouldSkip = false

	const validParts = parts.filter((x) => {
		const indexOf = input.indexOf(x, index)
		const preceding = input.slice(index, indexOf)

		index = indexOf + x.length

		if (shouldSkip) {
			if (preceding.includes("do()")) {
				shouldSkip = false
				return true
			}
			return false
		}

		if (preceding.includes("don't()")) {
			shouldSkip = true
			return false
		}

		return true
	})

	let total = 0
	for (const part of validParts) {
		const [num1, num2] = part
			.replaceAll("mul(", "")
			.replaceAll(")", "")
			.split(",")
			.map((x) => Number.parseInt(x))
		total += num1 * num2
	}

	return total
}
