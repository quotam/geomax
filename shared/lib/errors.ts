export class SafeError extends Error {}

export class AuthError extends SafeError {
	constructor(message = 'Authorization error..') {
		super(message)
		this.name = message
	}
}

export class DataValidateError extends SafeError {
	constructor(message = 'Data validate error..') {
		super(message)
		this.name = message
	}
}

export class AccessErrorError extends SafeError {
	constructor(message = 'Access denied..') {
		super(message)
		this.name = message
	}
}

export class BadRequestError extends SafeError {
	constructor(message = 'Bad request error..') {
		super(message)
		this.name = message
	}
}
