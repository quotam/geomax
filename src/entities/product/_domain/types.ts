import { Cuid, VideoEntity } from '@front/kernel/domain/types'

export type ProductDetailEntity = {
	metaDescription?: string
	metaKeywords?: string
	body: string
	images?: string[]
	videos?: VideoEntity[]
} & ProductEntity

export type ProductEntity = {
	id: Cuid
	title: string
	slug: string
	price?: number
	avability?: boolean
	imagePath: string
	description: string
	facturer?: FactureEntity
	categories?: CategotyEntity[]
	thumbnail?: string
}

/**
 * Сущность производителя
 */
export type FactureEntity = {} & TagEntity
/**
 * Сущность категории
 */
export type CategotyEntity = {} & TagEntity

type TagEntity = {
	id: Cuid
	title: string
	shortDescription?: string
	slug: string
}
