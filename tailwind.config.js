/** @type {import(tailwindcss).Config} */
const plugin = require("tailwindcss/plugin")

module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			height: {
				navScreen: "calc(calc(var(--vh, 1px) * 100) - 65px)",
				navScreenSpaced: "calc(calc(var(--vh, 1px) * 100) - 90px)",
				screen: "calc(var(--vh, 1px) * 100)",
			},
			minHeight: theme => theme("height"),
			maxHeight: theme => theme("height"),
			width: {
				"8xl": "1440px",
				"9xl": "1600px",
			},
			minWidth: theme => theme("width"),
			maxWidth: theme => theme("width"),
			fontSize: {
				xxs: "0.625rem",
			},
			textColor: theme => theme("colors"),
			backgroundColor: theme => theme("colors"),
			borderColor: theme => theme("colors"),
			ringColor: theme => theme("colors"),
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/line-clamp"),
		plugin(({ addUtilities }) => {
			addUtilities(
				{
					".scrollbar-hide": {
						/* IE and Edge */
						"-ms-overflow-style": "none",
						/* Firefox */
						"scrollbar-width": "none",
						/* Safari and Chrome */
						"&::-webkit-scrollbar": {
							display: "none",
						},
					},
					".scrollbar-default": {
						/* IE and Edge */
						"-ms-overflow-style": "auto",
						/* Firefox */
						"scrollbar-width": "auto",
						/* Safari and Chrome */
						"&::-webkit-scrollbar": {
							display: "block",
						},
					},
				},
				["responsive"]
			)
		}),
		plugin(function ({ addUtilities }) {
			const supportsTouchRule = "@supports (-webkit-touch-callout: none)"
			const webkitFillAvailable = "-webkit-fill-available"

			addUtilities(
				{
					".min-h-screen-ios": {
						[supportsTouchRule]: {
							minHeight: webkitFillAvailable,
						},
					},
					".h-screen-ios": {
						[supportsTouchRule]: {
							height: webkitFillAvailable,
						},
					},
					".max-h-screen-ios": {
						[supportsTouchRule]: {
							height: webkitFillAvailable,
						},
					},
				},
				["responsive"]
			)
		}),
	],
}
