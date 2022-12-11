module.exports = {
	rules: {
		"subject-case": [
			2,
			"never",
			["start-case", "pascal-case", "upper-case"],
		],
		"type-enum": [
			2,
			"always",
			[
				"build",
				"chore",
				"ci",
				"docs",
				"feat",
				"fix",
				"perf",
				"refactor",
				"revert",
				"style",
				"test",
				"deprecate",
				"security",
				"remove",
				"upgrade",
				"wip",
			],
		],
	},
}
