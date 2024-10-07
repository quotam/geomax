import { ArticleStatus } from '@prisma/client'
import { z } from 'zod'

export const serviceTag = 'slider'

export const ArticleUpdateSchema = z.object({
	id: z.string(),
	title: z.string().min(2, {
		message: 'текст должен содержать не менее 2 символов.'
	}),

	status: z.enum(Object.values(ArticleStatus) as [keyof typeof ArticleStatus], {
		required_error: 'Пожалуйста, выберите статус.'
	}),
	desc: z.string().optional(),
	categoryId: z.string().nullable().optional(),

	meta: z
		.string()
		.min(2, {
			message: 'текст должен содержать не менее 2 символов.'
		})
		.optional(),

	body: z.string().min(2, {
		message: 'текст должен содержать не менее 2 символов.'
	})
})

export type ArticleUpdateDto = z.infer<typeof ArticleUpdateSchema>
