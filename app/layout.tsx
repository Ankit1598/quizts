import "app/globals.css"
import { PropsWithChildren } from "react"
import "react-toastify/dist/ReactToastify.css"
import RootLayoutClient from "./layout.client"

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<html lang="en">
			<body>
				<RootLayoutClient>{children}</RootLayoutClient>
			</body>
		</html>
	)
}

export default RootLayout
