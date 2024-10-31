import { UserEntity } from '@front/kernel/domain/user'
import dbClient from '@front/shared/lib/dbClient'

import { userEntity } from '../_domain/entities'

export class UserRepo {
	async createUser(user: UserEntity): Promise<UserEntity> {
		return await dbClient.user.create({
			data: user,
			select: userEntity.fullUser
		})
	}
}

export const userRepo = new UserRepo()
