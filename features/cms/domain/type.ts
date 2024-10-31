import { ArticleStatus, Facturer, ProductCategory, ProductStatus, UserRole } from '@prisma/client'

export type Product = {
	id: string
	createdAt: Date
	updatedAt: Date
	title: string
	price: number | null
	images: string[]
	status: ProductStatus
	availability: boolean
	category: ProductCategory | null
	facturer: Facturer | null
	user: FullUser
}

export type FullUser = {
	id: string
	createdAt: Date
	updatedAt: Date
	name: string | null
	image: string | null
	email: string | null
	role: UserRole
	slug: string
} | null

export type Article = {
	id: string
	createdAt: Date
	updatedAt: Date
	status: ArticleStatus
	title: string
	meta: string
	body: string
	desc: string
	user: FullUser
	category: {
		id: string
		title: string
	} | null
}
