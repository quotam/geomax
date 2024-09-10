import { SessionEntity, userID } from '@front/kernel/domain/user'
import { AuthError, BadRequestError } from '@front/shared/lib/errors'
import { UserRole } from '@prisma/client'

export const ValidUserOrAdmin = (session: SessionEntity, userId: userID) => {
	if (!(session.user.id === userId || session.user.role === UserRole.ADMIN)) {
		throw new BadRequestError()
	}
}

export const ValidAdmin = (session: SessionEntity) => {
	if (session.user.role !== UserRole.ADMIN) {
		throw new AuthError()
	}
}
