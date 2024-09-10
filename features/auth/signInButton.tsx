'use client'
import { Button } from '@front/shared/ui/button'
import { LogIn } from 'lucide-react'
import { signIn } from 'next-auth/react'
import React from 'react'

const SignInButton = () => {
	const handleSignIn = () => signIn()

	return (
		<Button
			aria-label="Войти"
			aria-labelledby="Войти"
			name="signIn"
			className="flex gap-2 rounded-sm"
			variant="destructive"
			onClick={handleSignIn}
		>
			Войти <LogIn className="h-4 w-4" />
		</Button>
	)
}

export default SignInButton
