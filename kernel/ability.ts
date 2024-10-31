import { UserRole } from '@prisma/client'

import { SessionEntity } from './domain/user'

export const appAbility = (session: SessionEntity) => {
	return {
		adminLevel: session.user.role === UserRole.ADMIN ? true : false,
		editorLevel:
			session.user.role === UserRole.ADMIN
				? true
				: session.user.role === UserRole.EDITOR
					? true
					: false
	}
}
