import Link from 'next/link'
import React from 'react'

const NotFound = () => {
	return (
		<div className="w-screen h-[calc(100vh-20rem)] flex justify-center flex-col items-center">
			<h1 className="text-heading">
				{' '}
				<span className="text-[6.4rem]">404</span> | Страница не найдена
			</h1>
			<Link
				className="text-primary text-xl mt-2 underline hover:no-underline"
				href="/"
			>
				Вернуться на главную
			</Link>
		</div>
	)
}

export default NotFound
