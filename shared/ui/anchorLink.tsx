'use client'
import Link from 'next/link'
import React from 'react'

const AnchorLink = ({
	className,
	href,
	children
}: {
	className?: string
	href: string
	children: React.ReactNode
}) => {
	return (
		<Link
			onClick={() => (window.location.href = href)}
			href={href}
			className={className}
		>
			{children}
		</Link>
	)
}

export default AnchorLink
