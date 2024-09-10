import { Profile } from '../_domain/types'

export const getProfileDisplayName = (data: Profile) => {
	return data.name ? data.name : data.slug
}
