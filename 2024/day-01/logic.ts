export const part1 = (input: string) => {
	const rows = input.split("\n")
	const split = rows.map((x) => x.split("   "))
	const group1: number[] = []
	const group2: number[] = []
	split.map((x) => {
		group1.push(Number.parseInt(x[0]))
		group2.push(Number.parseInt(x[1]))
	})

	group1.sort((a, b) => {
		return a - b
	})
	group2.sort((a, b) => {
		return a - b
	})

	let totalDistance = 0

	for (let i = 0; i < group1.length; i++) {
		const first = group1[i]
		const second = group2[i]

		const distance = Math.abs(first - second)

		totalDistance += distance
	}

	return totalDistance
}

export const part2 = (input: string) => {
	const rows = input.split("\n")
	const split = rows.map((x) => x.split("   "))
	const group1: number[] = []
	const group2: number[] = []
	split.map((x) => {
		group1.push(Number.parseInt(x[0]))
		group2.push(Number.parseInt(x[1]))
	})

	let similarityScore = 0

	for (let i = 0; i < group1.length; i++) {
		const num = group1[i]
		const occurrences = group2.filter((x) => x === num).length

		const toAdd = num * occurrences

		similarityScore += toAdd
	}

	return similarityScore
}
