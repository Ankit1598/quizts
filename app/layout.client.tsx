"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Loader } from "components/atoms"
import { RouterStateProvider } from "context/RouterContext"
import nprogress from "nprogress"
import React, { PropsWithChildren, useCallback, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import queryClient from "services/queryClient"

nprogress.configure({
	minimum: 0.3,
	easing: "ease",
	speed: 800,
	showSpinner: true,
})

const RootLayoutWithQuery = ({ children }: PropsWithChildren) => {
	const [renderInProgress, setRenderInProgress] = React.useState(true)

	useEffect(() => setRenderInProgress(false), [])

	if (renderInProgress)
		return (
			<div className="h-screen w-full flex items-center justify-center">
				<Loader />
			</div>
		)

	return <>{children}</>
}

const check = () => {
	let vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty("--vh", `${vh}px`)
}

const RootLayoutClient = ({ children }: PropsWithChildren) => {
	const onStart = useCallback(() => nprogress.start(), [])
	const onComplete = useCallback(() => nprogress.done(), [])

	useEffect(() => {
		check()
		window.addEventListener("resize", check)

		return () => window.removeEventListener("resize", check)
	}, [])

	return (
		<>
			<RouterStateProvider
				onStart={onStart}
				onComplete={onComplete}
			>
				<QueryClientProvider client={queryClient}>
					<RootLayoutWithQuery>{children}</RootLayoutWithQuery>
					{process.env.NODE_ENV === "development" && (
						<ReactQueryDevtools initialIsOpen={true} />
					)}
				</QueryClientProvider>
			</RouterStateProvider>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover={false}
				theme="colored"
			/>
		</>
	)
}

export default RootLayoutClient
