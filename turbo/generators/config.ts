import type { PlopTypes } from "@turbo/gen"

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
				path: "{{ turbo.paths.root }}/2024/day-{{ day }}/package.json",
				templateFile: "templates/day/package.json.hbs"
			},
			{
				type: "add",
				path: "{{ turbo.paths.root }}/2024/day-{{ day }}/runner.ts",
				templateFile: "templates/day/runner.ts"
			},
			{
				type: "add",
				path: "{{ turbo.paths.root }}/2024/day-{{ day }}/logic.ts",
				templateFile: "templates/day/logic.ts"
			},
			{
				type: "add",
				path: "{{ turbo.paths.root }}/2024/day-{{ day }}/logic.test.ts",
				templateFile: "templates/day/logic.test.ts.hbs"
			},
			{
				type: "add",
				path: "{{ turbo.paths.root }}/2024/day-{{ day }}/inputs/example.txt",
				templateFile: "templates/day/empty.txt"
			},
			{
				type: "add",
				path: "{{ turbo.paths.root }}/2024/day-{{ day }}/inputs/puzzle.txt",
				templateFile: "templates/day/empty.txt"
			}
		]
	})
}
