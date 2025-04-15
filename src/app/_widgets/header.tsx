import Link from 'next/link'

import { getCategoriesListService } from '@front/entities/product/server'
import AppSearch from '@front/features/search/pub/search'
import { publicConfig } from '@front/shared/config/publicConfig'
import { cn } from '@front/shared/lib/utils'
import { Button } from '@front/shared/ui/button'
import LogoIcon from '@front/shared/ui/logoIcon'
import {
	ListItem,
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle
} from '@front/shared/ui/navigation-menu'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@front/shared/ui/sheet'
import { ChevronDown, HeartHandshake, Menu } from 'lucide-react'

export const menuItems = [
	{
		title: 'О компании',
		main: true,
		subMenu: [
			{
				title: 'FAQ',
				desc: 'Ответы на часто задаваемые вопросы, FAQ ',
				href: '/faq'
			},
			{
				title: 'Выполненные проекты',
				desc:
					'В этом разделе примеры наших успешных проектов, иллюстрирующие профессионализм и индивидуальный подход.',
				href: '/project'
			},
			{
				title: 'Реквизиты',
				desc: 'Юридическая информация.',
				href: '/legal'
			}
		]
	},
	{
		title: 'Каталог',
		href: '/catalog',
		subMenu: []
	},
	{
		title: 'Калькулятор экономии',
		href: '/calc'
	},
	{
		title: 'Сезонные предложения',
		href: '/offer'
	},
	{
		title: 'Контакты',
		href: '/contacts'
	}
]

const Logo = ({ className }: { className?: string }) => {
	return (
		<Link href="/" className={cn('text-primary  flex items-center gap-3', className)}>
			<LogoIcon className="h-7 w-7" />
			<span className="text-2xl font-medium uppercase">Геомакс</span>
		</Link>
	)
}

const Header = async () => {
	const catalog = await getCategoriesListService.exec()

	const items = menuItems.map(i => {
		if (i.title === 'Каталог') {
			return {
				...i,
				subMenu: catalog.map(c => ({
					title: c.title,
					href: `/catalog/category/${c.slug}`,
					desc: c.shortDescription
				}))
			}
		}
		return i
	})
	return (
		<header className="sticky top-0 z-50 w-full pt-1 backdrop-blur supports-[backdrop-filter]:bg-transparent">
			<div className="container flex justify-between items-center text-secondary-foreground">
				<Logo className="md:hidden w-40 lg:w-auto" />
				<Sheet>
					<SheetTrigger asChild>
						<Button
							aria-label="Меню"
							aria-labelledby="Меню"
							className="hidden size-11 bg-secondary/70 md:flex  border-foreground/10 border"
							variant="secondary"
							size="icon"
						>
							<Menu className="size-6" />
							<span className="sr-only">Меню</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="overflow-y-auto">
						<SheetHeader className="border-b pb-5 mb-5">
							<SheetClose asChild>
								<Logo />
							</SheetClose>
							<SheetTitle className="sr-only">menu items</SheetTitle>
							<SheetDescription className="sr-only">menu items</SheetDescription>
						</SheetHeader>
						<ul className="flex flex-col px-4 gap-5">
							{items.map((item, i) => {
								if (item.subMenu && !item.href)
									return (
										<li key={i}>
											<span className="text-sm text-muted-foreground  flex items-center gap-2">
												{item.title} <ChevronDown className="h-4 w-4 inline" />
											</span>
											<ul className="p-3 flex flex-col gap-5">
												{item.subMenu.map((subItem, i) => (
													<li key={i}>
														<SheetClose asChild>
															<Button variant="secondary" className="flex w-full h-12 items-center gap-2" asChild>
																<Link href={subItem.href} className="text-sm">
																	{subItem.title}
																</Link>
															</Button>
														</SheetClose>
													</li>
												))}
											</ul>
										</li>
									)
								return (
									<li key={i}>
										<SheetClose asChild>
											<Button variant="secondary" className="flex w-full items-center h-12 gap-2" asChild>
												<Link href={item.href}>{item.title}</Link>
											</Button>
										</SheetClose>
									</li>
								)
							})}
						</ul>
					</SheetContent>
				</Sheet>
				<NavigationMenu className="bg-secondary/70 p-1 border-[.1rem] border-foreground/10 rounded-lg">
					<NavigationMenuList>
						{items.map((item, i) => {
							if (item.subMenu)
								return (
									<NavigationMenuItem className="md:hidden" key={i}>
										<NavigationMenuTrigger>
											{item.href ? (
												<Link href={item.href} legacyBehavior passHref>
													{item.title}
												</Link>
											) : (
												item.title
											)}
										</NavigationMenuTrigger>
										<NavigationMenuContent className="flex justify-between w-[64rem]">
											{item.main && (
												<div className="w-1/2 py-6 pl-6">
													<NavigationMenuLink asChild>
														<Link
															className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
															href="/"
														>
															<LogoIcon className="text-primary h-16 w-16" />
															<div className="mb-2 text-lg font-medium mt-6 uppercase">Геомакс</div>
															<p className="text-sm leading-tight text-muted-foreground">
																Цифровые технологии на службе земледелия
															</p>
														</Link>
													</NavigationMenuLink>
												</div>
											)}
											<ul
												className={cn(
													'p-6 flex flex-wrap gap-3 justify-between items-start md:hidden',
													item.main ? 'flex-col' : 'flex-row'
												)}
											>
												{item.subMenu.map((subitem, j) => (
													<ListItem key={j} title={subitem.title} href={subitem.href} className="w-70">
														{subitem.desc}
													</ListItem>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								)
							return (
								<NavigationMenuItem key={i} className="md:hidden">
									<Link href={item.href} legacyBehavior passHref>
										<NavigationMenuLink className={navigationMenuTriggerStyle()}>
											{item.title}
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							)
						})}
						<NavigationMenuItem>
							<AppSearch />
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<div className="text-xs h-12 gap-4 border-[.1rem] border-foreground/10 hover:bg-secondary text-secondary-foreground cursor-pointer transition-colors flex items-center justify-between rounded-lg bg-secondary/60 py-1 text-left px-4">
					<HeartHandshake strokeWidth={1.6} className="size-9 text-primary" />
					<ul className="flex flex-col font-bold">
						{publicConfig.contacts.phones.map(p => (
							<li key={p.phone}>
								<Link className="hover:underline" href={`tel:${p.phone}`}>
									{p.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</header>
	)
}

export default Header
