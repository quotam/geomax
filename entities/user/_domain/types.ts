import { UserRole } from '@prisma/client'

export type Profile = {
	email?: string
	role: UserRole
	name?: string | null
	slug: string
	image?: string | null
}
