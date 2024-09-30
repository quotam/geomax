import {
	BadgeRussianRuble,
	BarChart,
	Box,
	CircleCheck,
	Images,
	Rss,
	TableOfContents
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const navItems = [
	{ name: 'Главная', icon: BarChart, href: '/admin' },
	{ name: 'Слайдер', icon: Images, href: '/admin/slider' },
	{ name: 'Новости', icon: Rss, href: '/admin/news' },
	{ name: 'Продукты', icon: Box, href: '/admin/products' },
	{ name: 'FAQ', icon: TableOfContents, href: '/admin/faq' },
	{ name: 'Проекты', icon: CircleCheck, href: '/admin/projects' },
	{ name: 'Предложения', icon: BadgeRussianRuble, href: '/admin/sale' }
]

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="container p-6 my-8 flex">
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
			</aside>
			{children}
		</div>
	)
}

export default AdminLayout
