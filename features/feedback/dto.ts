import { z } from 'zod'

export const FeedbackSchema = z.object({
	name: z.string().min(2, {
		message: 'Имя должно содержать не менее 2 символов'
	}),
	email: z.string().email({
		message: 'Введите корректный email адрес'
	}),
	message: z.string().min(2, {
		message: 'Сообщение должно содержать не менее 2 символов'
	}),
	agreed: z.boolean().refine(val => val === true, {
		message: 'Вы должны согласиться с условиями'
	})
})

export type FeedbackDto = z.infer<typeof FeedbackSchema>
