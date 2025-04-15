import React, { ReactNode } from 'react'

import Link from 'next/link'

import { cn } from '../lib/utils'

const InfoBlock = ({
	className,
	variant = 'default',
	icon,
	data
}: {
	data: {
		title: string
		desc: string
		link: string
		href: string
	}
	className?: string
	variant?: 'default' | 'primary'
	icon: ReactNode
}) => {
	return (
		<article
			className={cn(
				'flex flex-col md:w-85 xs:h-auto border-b-8 border-r-8 border-t-[.2rem] border-l-[.2rem] border-foreground dark:border-secondary/60 gap-7 bg-popover p-8 h-94 w-100  rounded-lg',
				variant === 'primary' && 'bg-foreground text-background',
				className
			)}
		>
			{icon}
			<dt className="text-2xl font-medium">
				{data.title.split('\n').map((item, index) => (
					<React.Fragment key={index}>
						{item}
						<br />
					</React.Fragment>
				))}
			</dt>
			<dd className="text-muted-foreground">
				{data.desc.split('\n').map((item, index) => (
					<React.Fragment key={index}>
						{item}
						<br />
					</React.Fragment>
				))}
			</dd>
			<Link href={data.href} className="font-bold underline hover:no-underline">
				{data.link}
			</Link>
		</article>
	)
}

export default InfoBlock
