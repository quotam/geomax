import { UserRole } from '@prisma/client'

export type Profile = {
	email?: string | null
	role: UserRole
	name?: string | null
	slug: string
	image?: string | null
}
