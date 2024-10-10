import { appAbility } from '@front/kernel/ability'
import { SessionEntity } from '@front/kernel/domain/user'

export const productAbility = (session: SessionEntity) => {
	const accessLevel = appAbility(session).editorLevel

	return {
		canViewAll: () => accessLevel,
		canUpdate: () => accessLevel,
		canCrete: () => accessLevel,
		canDelete: () => appAbility(session).adminLevel
	}
}
