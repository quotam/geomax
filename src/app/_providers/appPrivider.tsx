'use client'

import React from 'react'

import ThemeProvider from '@front/kernel/lib/next-theme/themeProvider'
import { Toaster } from '@front/shared/ui/sonner'
import { TooltipProvider } from '@radix-ui/react-tooltip'

import QueriesClient from './queriesClient'

const AppProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider>
			<QueriesClient>
				<TooltipProvider>{children}</TooltipProvider>
			</QueriesClient>
			<Toaster position="bottom-center" />
		</ThemeProvider>
	)
}

export default AppProvider
