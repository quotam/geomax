'use client'

import { createCmsAbility } from '@front/features/cms/domain/ability'
import CmsSidebar from '@front/features/cms/sidebar'
import { useAbility } from '@front/kernel/lib/next-auth/useAbility'
import { useAppSession } from '@front/kernel/lib/next-auth/useAppSession'
import { useRouter } from 'next/navigation'
import React, { useLayoutEffect } from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	const session = useAppSession()
	const ability = useAbility(createCmsAbility)
	const router = useRouter()

	useLayoutEffect(() => {
		if (ability && !ability.canManage()) {
			router.push('/')
		}
	}, [session.status, router, ability])

	if (ability?.canManage() && session.data) {
		return (
			<div className="container p-6 my-8 flex">
				<CmsSidebar session={session.data} />
				{children}
			</div>
		)
	}

	return null
}

export default AdminLayout
