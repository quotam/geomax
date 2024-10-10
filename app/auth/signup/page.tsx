import { Card, CardContent, CardHeader } from '@front/shared/ui/card'

const SignupPage = () => {
	return (
		<main className="flex-1 container">
			<Card className="p-4 mx-auto max-w-2xl  border mt-23">
				<CardHeader>
					<h1 className="text-2xl font-bold text-center">Последний шаг</h1>
				</CardHeader>
				<CardContent className="p-4"></CardContent>
			</Card>
		</main>
	)
}

export default SignupPage
