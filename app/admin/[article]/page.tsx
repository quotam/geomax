import NotFound from '@front/app/not-found'
import ListLayout from '@front/features/cms/articleListLayout'
import { ArticleType } from '@prisma/client'
import { z } from 'zod'

const schema = z.object({
	article: z.nativeEnum(ArticleType)
})

export default function FaqAdmin({
	params
}: {
	params: z.infer<typeof schema>
}) {
	const result = schema.safeParse(params)
	if (result.error) return <NotFound />

	return <ListLayout entityType={result.data.article} />
}
