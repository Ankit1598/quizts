"use client"

import { useRouterState } from "context/RouterContext"
import Link from "next/link"
import { ComponentProps, FC } from "react"

const Anchor: FC<ComponentProps<"a">> = ({ href, className, children }) => {
	const navigating = useRouterState()
	const useLink = href && href.startsWith("/")

	if (useLink)
		return (
			<Link
				href={href}
				onClick={() => {
					const { pathname, search, hash } = window.location
					if (href !== pathname + search + hash) navigating()
				}}
				className={className}
			>
				{children}
			</Link>
		)

	return (
		<a
			href={href}
			className={className}
		>
			{children}
		</a>
	)
}

export default Anchor
