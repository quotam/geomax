'use server'

import { mailService } from '@front/kernel/lib/mail/mailService'
import { schemaParse } from '@front/kernel/lib/zod/shemaParse'

import { FeedbackDto, FeedbackSchema } from './dto'

export const SendModalAction = async (dto: FeedbackDto) => {
	const resulst = schemaParse(FeedbackSchema, dto)
	return await mailService.FeedBack({
		name: resulst.name,
		subject: 'Заказ товара',
		phone: resulst.phone,
		email: resulst.email,
		message: 'Заказ товара ' + resulst.product
	})
}
