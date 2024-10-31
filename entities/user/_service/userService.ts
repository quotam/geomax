import { UserEntity } from '@front/kernel/domain/user'
import { privateConfig } from '@front/shared/config/privateConfig'
import { createID, createSlug } from '@front/shared/lib/cuid'
import { UserRole } from '@prisma/client'

import { userRepo } from '../_repo/user.repo'

type CreateUser = {
	name?: string | null
	email: string | null
	image?: string | null
	emailVerified?: Date | null
}

class UserService {
	async createUser(data: CreateUser) {
		const adminMails = privateConfig.ADMIN_EMAILS?.split(',') ?? []
		const role = adminMails.includes(data.email!) ? UserRole.ADMIN : UserRole.DEFAULT

		const firstLaters = data.email?.slice(0, 2)

		const user: UserEntity = {
			id: createID(),
			role,
			slug: firstLaters + createSlug(),
			...data
		}

		return await userRepo.createUser(user)
	}
}

export const userService = new UserService()
