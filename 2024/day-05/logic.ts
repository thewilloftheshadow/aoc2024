export const part1 = (input: string) => {
	const [rulesInput, updatesInput] = input.split("\n\n")

	const rules = rulesInput.split("\n").map((x) => x.split("|"))

	const updates = updatesInput.split("\n").map((x) => x.split(","))

	const correct: number[][] = []

	for (const update of updates) {
		let valid = true
		const allRelevantRules = rules.filter((rule) => {
			return (
				update.find((x) => x === rule[0]) && update.find((x) => x === rule[1])
			)
		})

		for (const rule of allRelevantRules) {
			const [before, after] = rule
			const indexBefore = update.indexOf(before)
			const indexAfter = update.indexOf(after)
			if (indexBefore > indexAfter) valid = false
		}

		if (valid) correct.push(update.map((x) => Number.parseInt(x)))
	}

	// get all middle numbers
	const middleNumbers = correct.map((x) => x[Math.ceil(x.length / 2) - 1])

	let total = 0
	for (const num of middleNumbers) total += num

	return total
}

export const part2 = (input: string) => {
	const [rulesInput, updatesInput] = input.split("\n\n")

	const rules = rulesInput.split("\n").map((x) => x.split("|"))

	const updates = updatesInput.split("\n").map((x) => x.split(","))

	const fixed: number[][] = []

	for (const update of updates) {
		let valid = true
		const allRelevantRules = rules.filter((rule) => {
			return (
				update.find((x) => x === rule[0]) && update.find((x) => x === rule[1])
			)
		})

		for (const rule of allRelevantRules) {
			const [before, after] = rule
			const indexBefore = update.indexOf(before)
			const indexAfter = update.indexOf(after)
			if (indexBefore > indexAfter) valid = false
		}

		if (!valid) {
			fixed.push(
				update
					.sort((a, b) => {
						const rule = allRelevantRules.find((x) => x[0] === a && x[1] === b)
						if (rule) {
							const indexBefore = update.indexOf(a)
							const indexAfter = update.indexOf(b)
							if (indexBefore > indexAfter) return -1
							if (indexBefore < indexAfter) return 1
						}
						return 0
					})
					.map((x) => Number.parseInt(x))
			)
		}
	}

	// get all middle numbers
	const middleNumbers = fixed.map((x) => x[Math.ceil(x.length / 2) - 1])

	let total = 0
	for (const num of middleNumbers) total += num

	return total
}
