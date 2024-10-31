'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

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
