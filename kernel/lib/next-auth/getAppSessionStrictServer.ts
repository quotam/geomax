import { AuthError } from '@front/shared/lib/errors'
import { headers } from 'next/headers'
import { RedirectType, redirect } from 'next/navigation'

import { getAppSessionServer } from './getAppSessionServer'

export const getAppSessionStrictServer = async () => {
	const session = await getAppSessionServer()

	if (session === null) {
		const callbackUrl = headers().get('referer')
		redirect(
			'/auth?callbackUrl=' +
				(callbackUrl && callbackUrl !== null && callbackUrl !== undefined ? callbackUrl : '/'),
			RedirectType.push
		)
		throw new AuthError()
	}
	return session
}
