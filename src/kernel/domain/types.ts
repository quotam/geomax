export type VideoEntity = {
	type: 'youtube' | 'tiktok' | 'rutube'
	url: string
}

export type Cuid = string

export type ArticleEntity = {
	id: Cuid
	title: string
	slug: string
	description: string
	imagePath: string
	date?: string
	thumbnail?: string
}

export type ArticleDetailEntity = ArticleEntity & {
	metaDescription?: string
	metaKeywords?: string
	body: string
	images?: string[]
	videos?: VideoEntity[]
}
