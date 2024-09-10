import Devider from '@front/shared/ui/divider'
import Link from 'next/link'
import EmailSignInform from './ui/eimailSignInForm'
import ProviderButton from './ui/googleProviderButton'
import { getProviders } from 'next-auth/react'

export const SignInForm = async () => {
	const providers = await getProviders()

	const oauthProviders = Object.values(providers ?? {}).filter(
		provider => provider.type === 'oauth'
	)

	return (
		<section className="p-4">
			<div className="flex flex-col gap-6">
				<EmailSignInform />
				<Devider text="или войдите c" />
				<div className="flex flex-col gap-3">
					{oauthProviders.map(provider => (
						<ProviderButton key={provider.id} provider={provider} />
					))}
				</div>
			</div>
			<span className="text-muted-foreground text-xs text-center mt-4 block">
				Нажимая кнопку «Войти», вы принимаете <br />
				<Link className="underline hover:no-underline" href="#">
					пользовательское соглашение
				</Link>{' '}
				и{' '}
				<Link className="underline hover:no-underline" href="#">
					политику конфиденциальности
				</Link>
				.
			</span>
		</section>
	)
}

export default SignInForm
