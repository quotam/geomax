import { z } from 'zod'

export const SignInFormSchema = z.object({
	email: z
		.string({ message: 'Email обязателен' })
		.email({ message: 'Некорректный email' })
})
