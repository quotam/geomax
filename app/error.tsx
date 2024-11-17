'use client'

import { Button } from '@front/shared/ui/button'
import LogoIcon from '@front/shared/ui/logoIcon'
import { Home, RefreshCcw } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4">
			<div className="text-center">
				<div className="mb-8">
					<LogoIcon className="h-40 text-destructive mx-auto w-40 text-center" />
				</div>
				<h1 className="text-lg font-bold text-gray-800 mb-4">Ой! Что-то пошло не так</h1>
				<h2 className="text-3xl font-bold text-gray-700 mb-4">Произошла ошибка</h2>
				<p className="text-gray-500 mb-8 max-w-100 mx-auto">
					Мы уже работаем над решением проблемы. Пожалуйста, попробуйте обновить страницу или вернитесь
					на главную.
				</p>
				<div className="flex justify-center space-x-4">
					<Button onClick={() => reset()}>
						<RefreshCcw className="w-5 h-5 mr-2" />
						Попробовать снова
					</Button>
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
