export class SafeError extends Error {}

export class SendMailError extends SafeError {
	constructor(message = 'Send mail error..') {
		super(message)
		this.name = message
	}
}

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

export class AccessDeniedError extends SafeError {
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
