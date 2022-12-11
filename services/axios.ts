import axios from "axios"
import CookieService from "./cookieService"

const accessPath = "/v1/auth/access"

const fetchWithToken = axios.create({
	baseURL: process.env.API_URL || "http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
	},
})

const fetchWithoutToken = axios.create({
	baseURL: process.env.API_URL || "http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
	},
})

fetchWithToken.interceptors.request.use(
	config => {
		const token = CookieService.getAccessToken()

		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	_error => Promise.reject(_error)
)

fetchWithToken.interceptors.response.use(
	res => res,
	async _error => {
		const originalConfig = _error.config

		if (
			_error.response?.status !== 401 ||
			originalConfig.url === accessPath ||
			!CookieService.getRefreshToken()
		) {
			return Promise.reject(_error)
		}

		return await fetchWithToken
			.post(accessPath, {
				refresh: CookieService.getRefreshToken(),
			})
			.then(resp => {
				const { token } = resp.data
				CookieService.updateAccessToken(token)

				return fetchWithToken(originalConfig)
			})
			.catch(_error => {
				CookieService.removeTokens()
				return Promise.reject(_error)
			})
	}
)

export { fetchWithToken, fetchWithoutToken }
