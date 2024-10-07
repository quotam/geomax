import { Card, CardContent, CardHeader } from '@front/shared/ui/card'

const VerifyPage = () => {
	return (
		<main className="flex-1 container">
			<Card className="p-4 mx-auto max-w-2xl  border mt-23">
				<CardHeader>
					<h1 className="text-2xl font-bold text-center">
						Подтвердите свой аккаунт
					</h1>
				</CardHeader>
				<CardContent className="p-4">
					<div>
						<ol className="flex flex-col gap-4">
							<li>
								1️⃣. Откройте почтовый ящик и найдите письмо от сайта с магической
								ссылкой для входа.
							</li>
							<li>
								2️⃣. Щелкните по ссылке в письме для автоматического входа на сайт.
							</li>
							<li>
								3️⃣. Теперь вы можете пользоваться сайтом без ввода логина и пароля.
							</li>
						</ol>
						<span className="text-sm block mt-4 text-secondary">
							Если у вас возникли проблемы с входом через магическую ссылку, обратитесь
							в службу поддержки для получения дополнительной помощи.
						</span>
					</div>
				</CardContent>
			</Card>
		</main>
	)
}

export default VerifyPage
