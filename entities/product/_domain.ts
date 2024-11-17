import { ProductStatus } from '@prisma/client'
import { z } from 'zod'

export const UpdateProdcutSchema = z.object({
	id: z.string(),
	title: z.string().min(2, {
		message: 'текст должен содержать не менее 2 символов.'
	}),

	images: z.array(z.string()).optional(),
	status: z.enum(Object.values(ProductStatus) as [keyof typeof ProductStatus], {
		required_error: 'Пожалуйста, выберите статус.'
	}),
	price: z.number().optional().nullable(),
	desc: z.string().optional().nullable(),

	categoryId: z.string().nullable().optional(),
	facturerId: z.string().nullable().optional(),

	availability: z.boolean().optional(),
	meta: z
		.string()
		.min(2, {
			message: 'текст должен содержать не менее 2 символов.'
		})
		.optional(),
	mataDesc: z
		.string()
		.min(2, {
			message: 'текст должен содержать не менее 2 символов.'
		})
		.optional(),
	body: z.string().min(2, {
		message: 'текст должен содержать не менее 2 символов.'
	})
})

export type UpdateProductDto = z.infer<typeof UpdateProdcutSchema>
