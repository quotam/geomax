'use client'
import AppSessionProvider from '@front/features/auth/appSessionProvider'
import ThemeProvider from '@front/kernel/lib/next-theme/themeProvider'
import { Session } from 'next-auth'
import React from 'react'
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
	return (
		<ThemeProvider>
			<AppSessionProvider session={session}>
				<QueriesClient>
					<TooltipProvider>{children}</TooltipProvider>
				</QueriesClient>
				<Toaster position="bottom-right" />
			</AppSessionProvider>
		</ThemeProvider>
	)
}

export default AppProvider
