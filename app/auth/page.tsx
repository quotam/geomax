import SignInForm from '@front/features/auth/signInForm'
import { Card, CardContent, CardHeader } from '@front/shared/ui/card'
import React from 'react'

const AuthPage = () => {
	return (
		<main className="flex-1 container">
			<Card className="p-4 mx-auto max-w-2xl  border mt-23">
				<CardHeader>
					<h1 className="text-2xl font-bold text-center">Авторизация</h1>
				</CardHeader>
				<CardContent className="p-4">
					<SignInForm />
				</CardContent>
			</Card>
		</main>
	)
}

export default AuthPage
