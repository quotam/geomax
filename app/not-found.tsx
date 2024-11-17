import { Button } from '@front/shared/ui/button'
import LogoIcon from '@front/shared/ui/logoIcon'
import { Home } from 'lucide-react'
import Link from 'next/link'

const NotFoundPage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4">
			<div className="text-center">
				<div className="mb-8">
					<LogoIcon className="h-40 mx-auto w-40 text-center" />
				</div>
				<h1 className="text-heading font-bold text-gray-800 mb-4">404</h1>
				<h2 className="text-3xl font-bold text-gray-700 mb-4">Страница не найдена</h2>
				<p className="text-gray-500 mb-8 max-w-100 mx-auto">
					Извините, но страница, которую вы ищете, не существует или была перемещена. Давайте вернемся на
					главную страницу!
				</p>
				<div className="flex gap-4 flex-col">
					<Link href="?modal" passHref>
						<Button>Заявка на консультацию</Button>
					</Link>

					<Link href="/" passHref>
						<Button variant="outline">
							<Home className="w-5 h-5 mr-2" />
							На главную
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFoundPage
