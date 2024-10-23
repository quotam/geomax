'use client'
import AppSessionProvider from '@front/features/auth/appSessionProvider'
import ThemeProvider from '@front/kernel/lib/next-theme/themeProvider'
import { Session } from 'next-auth'
import React, { useEffect } from 'react'
import { Toaster } from '@front/shared/ui/sonner'
import QueriesClient from './queriesClient'
import { TooltipProvider } from '@radix-ui/react-tooltip'

const AppProvider = ({
	children,
	session
}: {
	children: React.ReactNode
	session: Session | null | undefined
}) => {
	useEffect(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/sw.js').then(
				registration => {
					console.log('Service Worker registered with scope:', registration.scope)
				},
				error => {
					console.error('Service Worker registration failed:', error)
				}
			)
		}
	}, [])

	return (
		<ThemeProvider>
			<AppSessionProvider session={session}>
				<QueriesClient>
					<TooltipProvider>{children}</TooltipProvider>
				</QueriesClient>
				<Toaster position="bottom-center" />
			</AppSessionProvider>
		</ThemeProvider>
	)
}

export default AppProvider
