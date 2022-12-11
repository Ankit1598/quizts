import Cookies from "js-cookie"

const cookieOptions = {
	domain: process.browser ? window.location.hostname : "localhost",
	path: "/",
}

const accessKey = "token"
const refreshKey = "token_refresh"

const CookieService = {
	getAll(): { [key: string]: string } | boolean {
		return Cookies.get() || false
	},

	get(token: string): string | boolean {
		return Cookies.get(token) || false
	},

	set({ token, value }: { token: string; value: string }) {
		return Cookies.set(token, value, cookieOptions)
	},

	getRefreshToken(): string | boolean {
		return Cookies.get(refreshKey) || false
	},

	getAccessToken(): string | boolean {
		return Cookies.get(accessKey) || false
	},

	updateAccessToken(token: string) {
		Cookies.set(accessKey, token, cookieOptions)
	},

	setTokens({
		accessToken,
		refreshToken,
	}: {
		accessToken: string
		refreshToken: string
	}) {
		if (accessToken.includes("Bearer")) {
			accessToken = accessToken.split(" ")[1]
		}
		Cookies.set(accessKey, accessToken, cookieOptions)
		Cookies.set(refreshKey, refreshToken, cookieOptions)
	},

	removeTokens() {
		Cookies.remove(accessKey, cookieOptions)
		Cookies.remove(refreshKey, cookieOptions)
	},

	getServercookie({
		key,
		cookies,
	}: {
		key: string
		cookies: string
	}): string {
		// Get name followed by anything except a semicolon
		var cookieString = RegExp(key + "=[^;]+").exec(cookies)
		// Return everything after the equal sign, or an empty string if the cookie name not found
		return decodeURIComponent(
			!!cookieString ? cookieString.toString().replace(/^[^=]+./, "") : ""
		)
	},
}

export default CookieService
