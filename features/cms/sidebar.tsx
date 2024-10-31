'use client'

import { ProfileAvatar } from '@front/entities/user/_ui/profileAvatar'
import { getProfileDisplayName } from '@front/entities/user/profile'
import { SessionEntity } from '@front/kernel/domain/user'
import { Button } from '@front/shared/ui/button'
import { Separator } from '@front/shared/ui/separator'
import { ArticleType } from '@prisma/client'
import {
	BadgeRussianRuble,
	BarChart,
	Box,
	CircleCheck,
	Images,
	LogOut,
	Rss,
	TableOfContents
} from 'lucide-react'
import Link from 'next/link'

import { useSingOut } from '../auth/useSingOut'

const navItems = [
	{ name: 'Главная', icon: BarChart, href: '/admin' },
	{ name: 'Продукты', icon: Box, href: '/admin/product' },
	{ name: 'Слайдер', icon: Images, href: '/admin/slider' },
	{
		name: 'Новости',
		icon: Rss,
		href: '/admin/' + ArticleType.NEWS
	},
	{
		name: 'FAQ',
		icon: TableOfContents,
		href: '/admin/' + ArticleType.FAQ
	},
	{
		name: 'Проекты',
		icon: CircleCheck,
		href: '/admin/' + ArticleType.PROJECT
	},
	{
		name: 'Предложения',
		icon: BadgeRussianRuble,
		href: '/admin/' + ArticleType.OFFER
	}
]

const CmsSidebar = ({ session }: { session: SessionEntity }) => {
	const signOut = useSingOut()

	return (
		<aside className="w-64 mr-8">
			<nav className="space-y-1">
				{navItems.map(item => (
					<Link
						key={item.name}
						href={item.href}
						className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
					>
						<item.icon className="mr-3 h-6 w-6" />
						{item.name}
					</Link>
				))}
			</nav>
			<div className="p-4 flex flex-col gap-3">
				<Separator orientation="horizontal" />
				<ProfileAvatar profile={{ ...session.user }} />
				<p>
					<span>Вы вошли как: </span>
					<span className="text-lg font-bold">
						{getProfileDisplayName(session.user)} [{session.user.role}]
					</span>
				</p>
				<Button
					variant="secondary"
					className="gap-3"
					onClick={() => signOut.signOut()}
					disabled={signOut.isPending}
				>
					Выйти <LogOut className="h-4 w-4" />
				</Button>
			</div>
		</aside>
	)
}

export default CmsSidebar
