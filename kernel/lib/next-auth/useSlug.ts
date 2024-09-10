import { useAppSession } from './useAppSession'

export const useSlug = () => {
	const session = useAppSession()
	return session.data?.user.slug
}
