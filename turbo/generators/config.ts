import type { PlopTypes } from "@turbo/gen"

export const YEAR = 2024

export default function generator(plop: PlopTypes.NodePlopAPI): void {
	plop.setGenerator("day", {
		description: "New AOC day",
		prompts: [
			{
				type: "input",
				name: "day",
				message: "What is number of this day?",
				validate: (input: string) => {
					if (!Number.parseInt(input)) {
						return "Day should be a number"
					}
					return true
				},
				filter: (input: string) => {
					return input.padStart(2, "0")
				}
			}
		],
		actions: [
			{
				type: "add",
				path: `{{ turbo.paths.root }}/${YEAR}/day-{{ day }}/package.json`,
				templateFile: "templates/day/package.json.hbs"
			},
			{
				type: "add",
				path: `{{ turbo.paths.root }}/${YEAR}/day-{{ day }}/runner.ts`,
				templateFile: "templates/day/runner.ts"
			},
			{
				type: "add",
				path: `{{ turbo.paths.root }}/${YEAR}/day-{{ day }}/logic.ts`,
				templateFile: "templates/day/logic.ts"
			},
			{
				type: "add",
				path: `{{ turbo.paths.root }}/${YEAR}/day-{{ day }}/logic.test.ts`,
				templateFile: "templates/day/logic.test.ts.hbs"
			},
			{
				type: "add",
				path: `{{ turbo.paths.root }}/${YEAR}/day-{{ day }}/inputs/example.txt`,
				templateFile: "templates/day/empty.txt"
			},
			{
				type: "downloadInput"
			}
		]
	})

	plop.setActionType("downloadInput", async (_) => {
		const fs = require("node:fs")
		const c = _ as { day: string; turbo: { paths: { root: string } } }
		if (process.env.AOC_TOKEN) {
			const res = await fetch(
				`https://adventofcode.com/${YEAR}/day/${Number.parseInt(c.day || "0")}/input`,
				{
					headers: {
						cookie: `${process.env.AOC_TOKEN}`
					}
				}
			)
			if (!res.ok) {
				throw new Error(`Failed to download file: ${await res.text()}`)
			}
			let text = await res.text()
			if (text.endsWith("\n")) text = text.slice(0, -1)
			fs.writeFileSync(
				`${c.turbo.paths.root}/2024/day-${c.day}/inputs/puzzle.txt`,
				text
			)
			return "Input downloaded"
		}
		fs.writeFileSync(
			`${c.turbo.paths.root}/2024/day-${c.day}/inputs/puzzle.txt`,
			""
		)
		return "Blank input loaded"
	})
}
