'use client'
import { Session } from 'next-auth'
import React from 'react'
import { SessionProvider } from 'next-auth/react'

const AppSessionProvider = ({
	children,
	session
}: {
	children: React.ReactNode
	session: Session | null | undefined
}) => {
	return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AppSessionProvider
