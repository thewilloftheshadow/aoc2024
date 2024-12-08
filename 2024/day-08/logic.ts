export const part1 = (input: string) => {
	const antennas = input.split("\n").map((x) => x.split(""))

	const antidotes: number[][] = []

	for (let i = 0; i < antennas.length; i++) {
		const row = antennas[i]
		for (let j = 0; j < row.length; j++) {
			const antenna = row[j]
			if (antenna === ".") continue

			const antennasToCheck: [number, number][] = []
			for (let checkX = i; checkX < antennas.length; checkX++) {
				for (let checkY = 0; checkY < antennas[0].length; checkY++) {
					if (antennas[checkX][checkY] === antenna)
						antennasToCheck.push([checkX, checkY])
				}
			}

			antennasToCheck.map(([x, y]) => {
				const rise = x - i
				const run = y - j

				const point1 = [i - rise, j - run]
				const point2 = [x + rise, y + run]

				if (
					!antidotes.find((x) => x[0] === point1[0] && x[1] === point1[1]) &&
					!isOffGrid(point1[0], point1[1], antennas) &&
					point1[0] !== i &&
					point1[1] !== j
				)
					antidotes.push(point1)
				if (
					!antidotes.find((x) => x[0] === point2[0] && x[1] === point2[1]) &&
					!isOffGrid(point2[0], point2[1], antennas) &&
					point2[0] !== i &&
					point2[1] !== j
				)
					antidotes.push(point2)
			})
		}
	}

	return antidotes.length
}

export const part2 = (input: string) => {
	const antennas = input.split("\n").map((x) => x.split(""))

	const mainAntennas: number[][] = []

	const antidotes: number[][] = []

	for (let i = 0; i < antennas.length; i++) {
		const row = antennas[i]
		for (let j = 0; j < row.length; j++) {
			const antenna = row[j]
			if (antenna === ".") continue

			if (!mainAntennas.find((x) => x[0] === i && x[1] === j))
				mainAntennas.push([i, j])
		}
	}

	for (let i = 0; i < antennas.length; i++) {
		const row = antennas[i]
		for (let j = 0; j < row.length; j++) {
			const antenna = row[j]
			if (antenna === ".") continue

			const antennasToCheck: [number, number][] = []
			for (let checkX = i; checkX < antennas.length; checkX++) {
				for (let checkY = 0; checkY < antennas[0].length; checkY++) {
					if (antennas[checkX][checkY] === antenna)
						antennasToCheck.push([checkX, checkY])
				}
			}

			antennasToCheck.map(([x, y]) => {
				let count = 1
				const rise = x - i
				const run = y - j

				if (rise !== 0 && run !== 0) {
					let stopDown = false

					while (!stopDown) {
						const point = [i - rise * count, j - run * count]

						if (isOffGrid(point[0], point[1], antennas)) {
							stopDown = true
						} else if (
							!antidotes.find((x) => x[0] === point[0] && x[1] === point[1]) &&
							!mainAntennas.find((x) => x[0] === point[0] && x[1] === point[1])
						) {
							antidotes.push(point)
						}

						count += 1
					}

					count = 1
					let stopUp = false

					while (!stopUp) {
						const point = [i + rise * count, j + run * count]

						if (isOffGrid(point[0], point[1], antennas)) {
							stopUp = true
						} else if (
							!antidotes.find((x) => x[0] === point[0] && x[1] === point[1]) &&
							!mainAntennas.find((x) => x[0] === point[0] && x[1] === point[1])
						)
							antidotes.push(point)
						count += 1
					}
				}
			})
		}
	}

	return antidotes.length + mainAntennas.length
}

const isOffGrid = (x: number, y: number, grid: unknown[][]) => {
	if (x < 0) return true
	if (x >= grid.length) return true

	if (y < 0) return true
	if (y >= grid[x].length) return true

	return false
}
