import { appAbility } from '@front/kernel/ability'
import { SessionEntity } from '@front/kernel/domain/user'

export const editorAbility = (session: SessionEntity) => {
	const accessLevel = appAbility(session).editorLevel

	return {
		canUploadFile: () => accessLevel
	}
}
