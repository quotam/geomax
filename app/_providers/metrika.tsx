'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

declare global {
	interface Window {
		ym: (...args: unknown[]) => void
	}
}

const Metrika = ({ id }: { id: string }) => {
	const pathname = usePathname()

	useEffect(() => {
		if (typeof window !== 'undefined' && window.ym) {
			window.ym(id, 'hit', pathname)
		}
	}, [pathname, id])

	return null
}

export default Metrika
