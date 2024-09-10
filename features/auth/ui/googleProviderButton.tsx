'use client'
import { cn } from '@front/shared/lib/utils'
import { Button } from '@front/shared/ui/button'
import GoogleIcon from '@front/shared/ui/googleIcon'
import { ClientSafeProvider } from 'next-auth/react'
import { useOAuthSignIn } from '../useOauthSignIn'

const ProviderButton = ({
	className,
	provider
}: {
	className?: string
	provider: ClientSafeProvider
}) => {
	const oauthSignIn = useOAuthSignIn(provider)

	const getIcon = (provider: ClientSafeProvider) => {
		switch (provider.id) {
			case 'google':
				return <GoogleIcon />
			default:
				return null
		}
	}
	return (
		<Button
			className={cn('flex gap-2 items-center justify-center text-lg', className)}
			disabled={oauthSignIn.isPending}
			onClick={() => oauthSignIn.signIn()}
		>
			{getIcon(provider)} {provider.name}
		</Button>
	)
}

export default ProviderButton
