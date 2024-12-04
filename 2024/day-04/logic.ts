export const part1 = (input: string) => {
	const wordSearch = input.split("\n").map((x) => x.split(""))

	let total = 0

	// Find all that are just in the same row in the same order
	wordSearch.map((x) => {
		const row = x.join("")

		const occurrences = row.matchAll(/XMAS/g)
		total += occurrences.toArray().length
	})

	// Find all that are backwards
	wordSearch.map((x) => {
		const row = x.join("")

		const occurrences = row.matchAll(/SAMX/g)
		total += occurrences.toArray().length
	})

	// Find all vertical

	wordSearch.map((row, rowIndex) => {
		row.map((letter, letterIndex) => {
			if (letter === "X") {
				// Try downwards
				try {
					const validDownwards: string[] = []
					validDownwards.push(letter)
					for (let i = 1; i <= 3; i++)
						validDownwards.push(wordSearch[rowIndex + i][letterIndex])
					if (validDownwards.join("") === "XMAS") total += 1
				} catch {}

				// Try upwards
				try {
					const validUpwards: string[] = []
					validUpwards.push(letter)
					for (let i = 1; i <= 3; i++) {
						validUpwards.push(wordSearch[rowIndex - i][letterIndex])
					}
					if (validUpwards.join("") === "XMAS") total += 1
				} catch {}

				// Try diagonally up to the right
				try {
					const validDiagonallyUpRight: string[] = []
					validDiagonallyUpRight.push(letter)
					for (let i = 1; i <= 3; i++) {
						validDiagonallyUpRight.push(
							wordSearch[rowIndex - i][letterIndex + i]
						)
					}
					if (validDiagonallyUpRight.join("") === "XMAS") total += 1
				} catch {}

				// Try diagonally down to the right
				try {
					const validDiagonallyDownRight: string[] = []
					validDiagonallyDownRight.push(letter)
					for (let i = 1; i <= 3; i++) {
						validDiagonallyDownRight.push(
							wordSearch[rowIndex + i][letterIndex + i]
						)
					}
					if (validDiagonallyDownRight.join("") === "XMAS") total += 1
				} catch {}

				// Try diagonally up to the left
				try {
					const validDiagonallyUpLeft: string[] = []
					validDiagonallyUpLeft.push(letter)
					for (let i = 1; i <= 3; i++) {
						validDiagonallyUpLeft.push(
							wordSearch[rowIndex - i][letterIndex - i]
						)
					}
					if (validDiagonallyUpLeft.join("") === "XMAS") total += 1
				} catch {}

				// Try diagonally down to the left
				try {
					const validDiagonallyDownLeft: string[] = []
					validDiagonallyDownLeft.push(letter)
					for (let i = 1; i <= 3; i++) {
						validDiagonallyDownLeft.push(
							wordSearch[rowIndex + i][letterIndex - i]
						)
					}
					if (validDiagonallyDownLeft.join("") === "XMAS") total += 1
				} catch {}
			}
		})
	})

	return total
}

export const part2 = (input: string) => {
	const wordSearch = input.split("\n").map((x) => x.split(""))

	let total = 0

	wordSearch.map((row, rowIndex) => {
		row.map((letter, letterIndex) => {
			// check if letter is A, the center letter
			try {
				if (letter === "A") {
					const topLeftCorner = wordSearch[rowIndex - 1][letterIndex - 1]
					const topRightCorner = wordSearch[rowIndex - 1][letterIndex + 1]
					const bottomLeftCorner = wordSearch[rowIndex + 1][letterIndex - 1]
					const bottomRightCorner = wordSearch[rowIndex + 1][letterIndex + 1]

					const topLeftToBottomRight = `${topLeftCorner}${letter}${bottomRightCorner}`
					const bottomLeftToTopRight = `${bottomLeftCorner}${letter}${topRightCorner}`

					if (
						(topLeftToBottomRight === "MAS" ||
							topLeftToBottomRight === "SAM") &&
						(bottomLeftToTopRight === "MAS" || bottomLeftToTopRight === "SAM")
					)
						total += 1
				}
			} catch {}
		})
	})

	return total
}
