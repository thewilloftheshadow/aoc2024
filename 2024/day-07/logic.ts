export const part1 = (input: string) => {
	const rows = input
		.split("\n")
		.map((x) =>
			x.split(": ").map((x) => x.split(" ").map((x) => Number.parseInt(x)))
		)

	const valid: number[] = []

	for (const [totalStr, digits] of rows) {
		const total = totalStr[0]
		const digitCount = digits.length
		for (let i = 0; i < 2 ** (digitCount - 1); i++) {
			const binaryString = i
				.toString(2)
				.padStart(digitCount - 1, "0")
				.replaceAll("0", "+")
				.replaceAll("1", "*")

			const operators = binaryString.split("")

			let tempTotal = digits[0]

			for (let j = 0; j < operators.length; j++) {
				if (operators[j] === "+") {
					tempTotal += digits[j + 1]
				} else if (operators[j] === "*") {
					tempTotal = tempTotal * digits[j + 1]
				}
			}

			console.log(
				pretty(digits, operators),
				total,
				tempTotal,
				tempTotal === total
			)

			if (tempTotal === total) valid.push(total)
		}
	}
	return [...new Set(valid)].reduce((a, b) => a + b, 0)
}

export const part2 = (input: string) => {
	return input ? 0 : 0
}

const pretty = (numbers: number[], operators: string[]) => {
	let str = ""
	for (let i = 0; i < operators.length; i++) {
		str += `${numbers[i]}${operators[i]}`
	}
	str += numbers[numbers.length - 1]

	return str
}
