import { userWithOutName } from '@front/shared/config/app.const'
import { Profile } from '../_domain/types'
import { getProfileDisplayName } from './getProfileDisplayName'

const reg = /\.|\s|-|_/
export const getProfileLetters = (data: Profile) => {
	const name = getProfileDisplayName(data)

	let latt = userWithOutName.split(reg)

	try {
		latt = name.split(/\.|\s|-|_/)
	} catch (e) {}

	const [a, b] = latt

	if (!b) {
		return `${a[0]?.toUpperCase() ?? ''}${a[1]?.toUpperCase() ?? ''}`
	}

	return `${a[0]?.toUpperCase() ?? ''}${b[0]?.toUpperCase() ?? ''}`
}
