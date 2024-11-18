'use client'

import MetrikaFallback from '@front/shared/ui/metrikaFallback'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

declare global {
	interface Window {
		ym: (...args: unknown[]) => void
	}
}

const Metrika = ({ id }: { id: string }) => {
	const pathname = usePathname()
	const [isBlocked, setBlocked] = useState(false)
	useEffect(() => {
		if (typeof window !== 'undefined' && window.ym) {
			window.ym(id, 'hit', pathname)
		} else setBlocked(true)
	}, [pathname, id])

	return isBlocked ? <MetrikaFallback id={id} /> : null
}

export default Metrika
