import { SessionEntity } from '@front/kernel/domain/user'
import { useMemo } from 'react'
import { useAppSession } from './useAppSession'

export function useAbility<T>(abilityFactory: (session: SessionEntity) => T) {
	const session = useAppSession()

	return useMemo(
		() =>
			session.status === 'authenticated' ? abilityFactory(session.data) : null,
		[abilityFactory, session.data, session.status]
	)
}
