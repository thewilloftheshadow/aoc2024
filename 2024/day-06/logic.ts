export const validIndicators = ["v", "<", ">", "^"]

export const part1 = async (input: string, test = false) => {
	const grid = input.split("\n").map((x) => x.split(""))

	while (grid.find((x) => x.find((a) => validIndicators.includes(a)))) {
		if (test) {
			console.log(grid.map((x) => x.map((a) => a).join("")).join("\n"))
			console.log("\n")
		}
		const xAxis = grid.findIndex((x) =>
			x.find((a) => validIndicators.includes(a))
		)
		const yAxis = grid[xAxis].findIndex((x) => validIndicators.includes(x))

		const indicator = grid[xAxis][yAxis]

		if (indicator === "^") {
			if (xAxis === 0) {
				grid[xAxis][yAxis] = "X"
			} else {
				const spaceInFront = grid[xAxis - 1][yAxis]
				if (spaceInFront === "#") {
					grid[xAxis][yAxis] = ">"
				} else {
					grid[xAxis][yAxis] = "X"
					grid[xAxis - 1][yAxis] = "^"
				}
			}
		} else if (indicator === ">") {
			if (yAxis + 1 === grid[xAxis].length) {
				grid[xAxis][yAxis] = "X"
			} else {
				const spaceInFront = grid[xAxis][yAxis + 1]
				if (spaceInFront === "#") {
					grid[xAxis][yAxis] = "v"
				} else {
					grid[xAxis][yAxis] = "X"
					grid[xAxis][yAxis + 1] = ">"
				}
			}
		} else if (indicator === "v") {
			if (xAxis + 1 === grid.length) {
				grid[xAxis][yAxis] = "X"
			} else {
				const spaceInFront = grid[xAxis + 1][yAxis]
				if (spaceInFront === "#") {
					grid[xAxis][yAxis] = "<"
				} else {
					grid[xAxis][yAxis] = "X"
					grid[xAxis + 1][yAxis] = "v"
				}
			}
		} else if (indicator === "<") {
			if (yAxis - 1 < 0) {
				grid[xAxis][yAxis] = "X"
			} else {
				const spaceInFront = grid[xAxis][yAxis - 1]
				if (spaceInFront === "#") {
					grid[xAxis][yAxis] = "^"
				} else {
					grid[xAxis][yAxis] = "X"
					grid[xAxis][yAxis - 1] = "<"
				}
			}
		}

		if (test) await Bun.sleep(250)
	}

	let total = 0
	for (const row of grid) {
		for (const col of row) {
			if (col === "X") total += 1
		}
	}
	return total
}

const workerCount = 8
export const part2 = async (input: string) => {
	const originalGrid = input.split("\n").map((x) => x.split(""))

	const numWorkers = Math.min(workerCount, originalGrid.length)
	const workers: Worker[] = []
	let found = 0

	const coordinates: [number, number][] = []
	for (let i = 0; i < originalGrid.length; i++) {
		for (let j = 0; j < originalGrid[0].length; j++) {
			if (originalGrid[i][j] !== "^") {
				coordinates.push([i, j])
			}
		}
	}

	const chunkSize = Math.ceil(coordinates.length / numWorkers)
	const chunks = Array(numWorkers)
		.fill(null)
		.map((_, index) =>
			coordinates.slice(index * chunkSize, (index + 1) * chunkSize)
		)

	const workerPromises = chunks.map((chunk, index) => {
		const worker = new Worker("./worker.ts")
		workers.push(worker)

		return new Promise<number>((resolve) => {
			worker.onmessage = (event) => {
				resolve(event.data)
			}

			worker.postMessage({
				grid: originalGrid,
				coordinates: chunk,
				workerNum: index
			})
		})
	})

	const results = await Promise.all(workerPromises)
	found = results.reduce((acc, curr) => acc + curr, 0)

	for (const worker of workers) {
		worker.terminate()
	}

	return found
}
