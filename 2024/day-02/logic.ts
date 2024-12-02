export const part1 = (input: string) => {
	const levels = input
		.split("\n")
		.map((x) => x.split(" ").map((x) => Number.parseInt(x)))

	const safe: Array<(typeof levels)[number]> = []

	levels.map((level) => {
		// e = the element we are checking, i = the index in the array its at
		const isAscending = level.slice(1).every((e, i) => e > level[i])
		const isDescending = level.slice(1).every((e, i) => e < level[i])
		const differCheck = level.slice(0).every((e, i) => {
			// Any two adjacent levels differ by at least one and at most three.
			if (i === 0) return true // ignore the first one
			if (i === level.length - 1) return true // ignore the last one

			const previous = level[i - 1]
			const next = level[i + 1]

			return (
				differenceBetweenTwoNumbers(e, previous) >= 1 &&
				differenceBetweenTwoNumbers(e, previous) <= 3 &&
				differenceBetweenTwoNumbers(e, next) >= 1 &&
				differenceBetweenTwoNumbers(e, next) <= 3
			)
		})

		if ((isAscending || isDescending) && differCheck) safe.push(level)
	})

	return safe.length
}

const differenceBetweenTwoNumbers = (num1: number, num2: number) => {
	return Math.abs(num1 - num2)
}

export const part2 = (input: string) => {
	const levels = input
		.split("\n")
		.map((x) => x.split(" ").map((x) => Number.parseInt(x)))

	const safe: Array<(typeof levels)[number]> = []

	const isSafe = (level: number[]) => {
		const isAscending = level.slice(1).every((e, i) => e > level[i])
		const isDescending = level.slice(1).every((e, i) => e < level[i])
		const differCheck = level.slice(0).every((e, i) => {
			// Any two adjacent levels differ by at least one and at most three.
			if (i === 0) return true // ignore the first one
			if (i === level.length - 1) return true // ignore the last one

			const previous = level[i - 1]
			const next = level[i + 1]

			return (
				differenceBetweenTwoNumbers(e, previous) >= 1 &&
				differenceBetweenTwoNumbers(e, previous) <= 3 &&
				differenceBetweenTwoNumbers(e, next) >= 1 &&
				differenceBetweenTwoNumbers(e, next) <= 3
			)
		})

		if ((isAscending || isDescending) && differCheck) return true
		return false
	}

	levels.map((level) => {
		if (isSafe(level)) return safe.push(level)

		let safeWithRemovingOne = false
		for (let i = 0; i < level.length; i++) {
			const testing = [...level]
			testing.splice(i, 1)
			if (isSafe(testing)) safeWithRemovingOne = true
		}
		if (safeWithRemovingOne) return safe.push(level)
	})

	return safe.length
}
