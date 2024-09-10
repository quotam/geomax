import { UserEntity } from '@front/kernel/domain/user'
import { UserRole } from '@prisma/client'

type Target = {
	id: UserEntity['id']
	role: UserEntity['role']
	privateContext: number[]
	messagesPriviteCxt: number
	friendsPriviteCxt: number
}

export const canAddFrends = (
	target: Target,
	user: Omit<UserEntity, 'email' | 'slug'>
) => {
	if (user.id === target.id) return false

	if (user.role === UserRole.ADMIN) return true

	if (target.friendsPriviteCxt > 0) {
		return true
	}
	return false
}
