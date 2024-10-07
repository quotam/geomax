import { SessionEntity } from '@front/kernel/domain/user'
import { UserRole } from '@prisma/client'

export const createCmsAbility = (session: SessionEntity) => {
	return {
		canManage: () =>
			session.user.role === UserRole.ADMIN || session.user.role === UserRole.EDITOR
	}
}
