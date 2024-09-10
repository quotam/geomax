import { useMutation } from '@tanstack/react-query'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const useSingOut = () => {
	const router = useRouter()

	const mutation = useMutation({
		mutationFn: () => signOut({ callbackUrl: '/' }),
		onSuccess: async () => {
			router.push('/')
		}
	})

	return {
		isPending: mutation.isPending,
		signOut: mutation.mutate
	}
}
