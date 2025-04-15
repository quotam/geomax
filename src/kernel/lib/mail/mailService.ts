import { privateConfig } from '@front/shared/config/privateConfig'
import { SendMailError } from '@front/shared/lib/errors'
import { PhoneNumber } from '@front/shared/lib/utils'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { z } from 'zod'

export const SendFeedSchema = z.object({
	subject: z.string().nullable().optional(),
	message: z.string(),
	email: z.string().nullable().optional(),
	name: z.string().nullable().optional(),
	phone: z.string().nullable().optional()
})

export type SendFeedDto = z.infer<typeof SendFeedSchema>

class MailService {
	private _mailerOption = privateConfig.MAILER
	private _transporter: nodemailer.Transporter

	constructor() {
		this._transporter = nodemailer.createTransport(this._mailerOption)
	}

	public async FeedBack(data: SendFeedDto) {
		const options: Mail.Options = {
			subject: `[Сообщение с сайта], ${data.subject}`,
			html: `
${data.message}<br/><br/>
Дополнительная информация:<br/>
${data.name && `<tr/>имя: ${data.name}`}
${data.email && `<tr/>email: <a href="mailto:${data.email}">${data.email}</a>`}
${data.phone && `<tr/>телефон: <a href="tel:${PhoneNumber(data.phone)}">${data.phone}</a>`}
`
		}
		return await this._sendMail(options)
	}

	private async _sendMail(options: Mail.Options) {
		try {
			const info = await this._transporter.sendMail({
				to: process.env.NOTIFICATION_EMAILS || this._mailerOption.auth.user,
				...options,
				from: this._mailerOption.auth.user
			})
			return info.messageId
		} catch (e: unknown) {
			console.error(e)
			throw new SendMailError()
		}
	}
}

export const mailService = new MailService()
