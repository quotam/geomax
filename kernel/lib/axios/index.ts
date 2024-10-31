import axios from 'axios'

import { getContentType } from './helpers'

export const instance = axios.create({
	baseURL: '/api/',
	headers: getContentType()
})

instance.interceptors.response.use(
	config => config,
	async error => {
		throw error
	}
)
