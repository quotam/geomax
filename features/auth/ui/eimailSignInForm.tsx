'use client'

import { AuthErrors } from '@front/kernel/lib/next-auth/errors'
import { Button } from '@front/shared/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@front/shared/ui/form'
import { Input } from '@front/shared/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SignInFormSchema } from '../model/singInFormSchema'
import { useEmailSignIn } from '../useEmaiSignIn'

export const EmailSignInform = () => {
	const error = useSearchParams().get('error')

	const errorMessage = error && (AuthErrors[error as keyof typeof AuthErrors] ?? AuthErrors.default)

	const form = useForm<z.infer<typeof SignInFormSchema>>({
		resolver: zodResolver(SignInFormSchema)
	})

	const emailSignIn = useEmailSignIn()

	return (
		<Form {...form}>
			{errorMessage}
			<form className="w-full" onSubmit={form.handleSubmit(data => emailSignIn.signIn(data.email))}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Ваш рабочий email.." className="resize-none w-full" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={emailSignIn.isPending}
					className="w-full mt-4"
					variant="secondary"
					type="submit"
				>
					Войти через email
				</Button>
			</form>
		</Form>
	)
}

export default EmailSignInform
