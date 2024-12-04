# AOC 2024

Enjoy :)

**Note: You need to use `bun run test` instead of `bun test`, or go to a day folder directly to use `bun test`.**

## Rules

- No AI usage whatsoever, including autocomplete tools like Copilot or Supermaven.
- Once code is used and gets the correct answer, it will never be changed or optimized.
- Goal is just to complete every puzzle, no performance optimizations or anything.

## Day Structure

Days are structured as follows:

```
2024
├── day-01
│   ├── inputs
│   │   ├── example.txt
│   │   └── puzzle.txt
│   ├── logic.ts
│   ├── logic.test.ts
│   ├── package.json
│   └── runner.ts
└── day-02
    ├── inputs
    │   ├── example.txt
    │   └── puzzle.txt
    ├── logic.ts
    ├── logic.test.ts
    ├── package.json
    └── runner.ts
```

The inputs folder contains the puzzle input and the example input.
The logic.ts file contains the actual logic to solve the puzzle.
The logic.test.ts file contains the tests for the logic that takes in the example.txt input and compares it to the example solution that the puzzle gives you
The runner.ts file contains the code that runs the logic and prints the results for the main puzzle.txt input.

## Day Generator

To generate a new day, run the following command:

```bash
bunx turbo gen day
```
