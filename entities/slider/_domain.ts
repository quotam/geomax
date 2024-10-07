import { SliderStatus } from '@prisma/client'
import { z } from 'zod'

export const SliderUpdateSchema = z.object({
	id: z.string(),
	status: z.enum(Object.values(SliderStatus) as [keyof typeof SliderStatus], {
		required_error: 'Пожалуйста, выберите статус.'
	}),
	body: z.string().min(2, {
		message: 'Текст должен содержать не менее 2 символов.'
	})
})

export type SliderUpdateDto = z.infer<typeof SliderUpdateSchema>
