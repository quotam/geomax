export const getContentType = () => ({
	'Content-Type': 'application/json'
})

export const errorCatcher = (error: any): string => {
	const message = error.response?.data?.message || error.response?.data?.name
	return message
		? typeof error.response.data.message === 'object'
			? message[0]
			: message
		: error.message
}
