import NotFound from '@front/app/not-found'
import FormLayout from '@front/features/cms/articleFormLayout'
import { ArticleType } from '@prisma/client'
import React from 'react'
import { z } from 'zod'

const schema = z.object({
	article: z.nativeEnum(ArticleType),
	id: z.string()
})
const ArticleUpdatePage = ({ params }: { params: z.infer<typeof schema> }) => {
	const result = schema.safeParse(params)
	if (result.error) return <NotFound />

	return <FormLayout entityType={result.data.article} id={result.data.id} />
}

export default ArticleUpdatePage
