import { getAppSessionServer } from '@front/kernel/lib/next-auth/getAppSessionServer'
import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import AppProvider from './_providers/appPrivider'
import './globals.css'
import Header from './_widgets/header'
import Footer from './_widgets/footer'
import Modal from '@front/features/modal/pub'

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-sans',
	weight: ['400', '600', '700']
})

export const metadata: Metadata = {
	title: {
		default: 'Геомакс',
		template: '%s | Геомакс'
	},
	description:
		'Установка, настройка и ввод в эксплуатацию систем точного земледелия - курсоуказателей, автопилотов, GPS-навигации. Подключение корректирующего сигнала для сельскохозяйственной техники',
	keywords:
		'агронавигаторы, автопилоты, RTK сигнал, GNSS, подрульки, подруливающие устройства'
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: 'auto'
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getAppSessionServer()

	return (
		<html lang="ru">
			<body className={nunito.className}>
				<AppProvider session={session}>
					<div className="min-h-screen flex flex-col">
						<Header />
						{children}
						<Footer />
					</div>
					<Modal />
				</AppProvider>
			</body>
		</html>
	)
}
