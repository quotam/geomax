import { FeedbackDto } from '@front/features/orderButt/dto'
import { privateConfig } from '@front/shared/config/privateConfig'

class CrmService {
	async leadCreate(data: FeedbackDto) {
		const leadFields = {
			TITLE: `Запрос на продукт: ${data.product}`, // Название лида
			NAME: data.name, // Имя
			PHONE: [{ VALUE: data.phone, VALUE_TYPE: 'WORK' }], // Телефон
			EMAIL: data.email ? [{ VALUE: data.email, VALUE_TYPE: 'WORK' }] : [], // Email, если передан
			COMMENTS: `Запрос на продукт: ${data.product}`,
			WEB: [{ VALUE: 'https://agro-nav.ru', VALUE_TYPE: 'WORK' }],
			STATUS_ID: 'NEW' // Статус "Не обработан"
		}

		const options = {
			REGISTER_SONET_EVENT: 'Y' // Регистрация события в ленте CRM
		}

		try {
			const response = await fetch(privateConfig.LEAD_CREATE_WEBHOOK, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fields: leadFields,
					options: options
				})
			})

			const result = await response.json()
			if (result.error) {
				throw new Error(result.error_description || 'Unknown error while creating lead')
			} else {
				console.log(JSON.stringify(result) + 'lead created successfully ----------')
			}
		} catch (error: any) {
			throw new Error(error.message)
		}
	}
}

export const crmService = new CrmService()
