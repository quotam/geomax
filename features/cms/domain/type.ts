import { ArticleStatus, UserRole } from '@prisma/client'

export type Article = {
	meta: string
	id: string
	createdAt: Date
	updatedAt: Date
	status: ArticleStatus
	title: string
	body: string
	desc: string
	user: {
		id: string
		createdAt: Date
		updatedAt: Date
		name: string | null
		image: string | null
		email: string | null
		role: UserRole
		slug: string
	} | null
	category: {
		id: string
		title: string
	} | null
}
