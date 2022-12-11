"use client"

import { usePathname, useSearchParams } from "next/navigation"
import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react"

const RouterContext = createContext<() => void>(() => {})

export const useRouterState = () => useContext(RouterContext)

interface IRouterStateProps extends PropsWithChildren {
	onStart: () => void
	onComplete: () => void
}

export const RouterStateProvider: FC<IRouterStateProps> = ({
	onStart,
	onComplete,
	children,
}) => {
	const [isChanging, setIsChanging] = useState<boolean>(false)
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => setIsChanging(false), [pathname, searchParams])

	useEffect(() => {
		if (isChanging) onStart()
		else onComplete()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isChanging])

	return (
		<RouterContext.Provider value={() => setIsChanging(true)}>
			{children}
		</RouterContext.Provider>
	)
}
