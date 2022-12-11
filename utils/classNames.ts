import { twMerge } from "tailwind-merge"

const classNames = (classes: string) => {
	return twMerge(classes.split(" ").filter(Boolean).join(" "))
}

export default classNames
