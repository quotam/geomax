import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import Script from 'next/script'

import Modal from '@front/features/modal'
import { privateConfig } from '@front/shared/config/privateConfig'
import ScrollToTopButton from '@front/shared/ui/scrollUpBut'

import AppProvider from './_providers/appPrivider'
import MetrikaHitRouter from './_providers/metrika'
import Footer from './_widgets/footer'
import Header from './_widgets/header'
import './globals.css'

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-sans',
	weight: ['400', '600', '700']
})

export const metadata: Metadata = {
	title: {
		default:
			'ГЕОМАКС — поставка и установка навигационных систем и автопилотов для сельскохозяйственной техники.',
		template: '%s | ГЕОМАКС'
	},
	manifest: '/manifest.json',
	description:
		'Установка, настройка и ввод в эксплуатацию систем точного земледелия - курсоуказателей, автопилотов, GPS-навигации. Подключение корректирующего сигнала для сельскохозяйственной техники',
	keywords: 'агронавигаторы, автопилоты, RTK сигнал, GNSS, подрульки, подруливающие устройства'
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
	return (
		<html lang="ru" suppressHydrationWarning>
			<Script
				id="yandex-metrika"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                k=e.createElement(t),a=e.getElementsByTagName(t)[0];
                k.async=1;k.src=r;a.parentNode.insertBefore(k,a)
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(${privateConfig.METRIKA_ID}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `
				}}
			/>
			<body className={nunito.className}>
				<AppProvider>
					<div className="min-h-screen flex flex-col">
						<Header />
						{children}
						<Footer />
					</div>
					<Modal />
				</AppProvider>
				<MetrikaHitRouter id={privateConfig.METRIKA_ID} />
				<ScrollToTopButton />
			</body>
		</html>
	)
}
