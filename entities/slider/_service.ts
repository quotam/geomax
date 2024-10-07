import cacheStrategy from '@front/kernel/lib/cache-strategy'
import dbClient from '@front/shared/lib/dbClient'
import { SliderStatus } from '@prisma/client'
import { SliderUpdateDto } from './_domain'
import { userID } from '@front/kernel/domain/user'
import { userEntity } from '../user/_domain/entities'

const serviceTag = 'slider'

class SliderService {
	async getAll() {
		return await cacheStrategy.fetch([serviceTag], () =>
			dbClient.slider.findMany({
				where: {
					status: SliderStatus.PUBLISHED
				},
				select: {
					id: true,
					body: true,
					createdAt: true
				}
			})
		)
	}

	async getAllAdmin() {
		return await dbClient.slider.findMany({
			select: {
				id: true,
				body: true,
				createdAt: true,
				updatedAt: true,
				status: true,
				user: {
					select: userEntity.fullUser
				}
			}
		})
	}
	async getOne(id: string) {
		return await dbClient.slider.findUnique({ where: { id } })
	}

	async update(dto: SliderUpdateDto) {
		const { id } = await dbClient.slider.update({
			where: { id: dto.id },
			data: {
				body: dto.body,
				status: dto.status
			}
		})
		cacheStrategy.invalidate(serviceTag)
		return id
	}
	async create(userId: userID) {
		const { id } = await dbClient.slider.create({
			data: {
				body: '',
				user: {
					connect: {
						id: userId
					}
				}
			},
			select: {
				id: true
			}
		})

		return id
	}
	async delete(id: string) {
		await dbClient.slider.delete({ where: { id } })

		cacheStrategy.invalidate(serviceTag)
		return id
	}
}

export const sliderService = new SliderService()
