import { validIndicators } from "./logic"

const processCoordinate = (
	originalGrid: string[][],
	[i, j]: [number, number],
	workerNum: number
): boolean => {
	const grid = structuredClone(originalGrid)
	grid[i][j] = "#"
	let step = 0

	console.log(`Worker ${workerNum} processing [${i},${j}]`)

	while (
		grid.find((x) => x.find((a) => validIndicators.includes(a))) &&
		step < 6000
	) {
		step += 1
		const xAxis = grid.findIndex((x) =>
			x.find((a) => validIndicators.includes(a))
		)
		const yAxis = grid[xAxis].findIndex((x) => validIndicators.includes(x))
		const indicator = grid[xAxis][yAxis]

		switch (indicator) {
			case "^":
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
				break
			case ">":
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
				break
			case "v":
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
				break
			case "<":
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
				break
		}
	}

	console.log(`Worker ${workerNum} done in ${step} steps`)

	return step >= 6000
}

self.onmessage = (
	message: MessageEvent<{
		grid: string[][]
		coordinates: [number, number][]
		workerNum
	}>
) => {
	const { grid, coordinates, workerNum } = message.data
	let found = 0

	for (const coord of coordinates) {
		if (processCoordinate(grid, coord, workerNum)) {
			found += 1
		}
	}

	self.postMessage(found)
}
