import { z } from 'zod'

export const FeedbackSchema = z.object({
	name: z.string().min(2, {
		message: 'Имя должно содержать не менее 2 символов'
	}),
	phone: z.string().regex(/^\+?[0-9]{10,14}$/, {
		message: 'Введите корректный номер телефона'
	}),
	agreed: z.boolean().refine(val => val === true, {
		message: 'Вы должны согласиться с условиями'
	})
})

export type FeedbackDto = z.infer<typeof FeedbackSchema>
