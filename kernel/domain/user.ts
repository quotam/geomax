import { UserRole } from '@prisma/client'

export type userID = string
export type userRole = UserRole

export type UserEntity = {
	id: userID
	email: string | null
	name?: string | null
	emailVerified?: Date | null
	slug: string
	image?: string | null
	role: UserRole
}

export type AppSession = {
	data: SessionEntity | null
	status: 'loading' | 'unauthenticated' | 'authenticated'
}

export type SessionEntity = {
	user: {
		id: userID
		email: string
		name?: string | null
		image?: string | null
		slug: string
		role: UserRole
	}
	expires: string
}
