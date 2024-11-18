'use server'

import { mailService } from '@front/kernel/lib/mail/mailService'
import { schemaParse } from '@front/kernel/lib/zod/shemaParse'

import { FeedbackDto, FeedbackSchema } from './dto'

export const SendModalAction = async (dto: FeedbackDto) => {
	const resulst = schemaParse(FeedbackSchema, dto)
	return await mailService.FeedBack({
		name: resulst.name,
		subject: 'Запрос на обратную связь',
		phone: resulst.phone,
		message: 'Запрос на обратную связь'
	})
}
