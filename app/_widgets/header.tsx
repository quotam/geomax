import { productService } from '@front/entities/product/_service'
import AppSearch from '@front/features/search/pub/search'
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
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from '@front/shared/ui/sheet'
import { ChevronDown, Menu } from 'lucide-react'
import Link from 'next/link'

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
		title: 'Новости',
		href: '/news'
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
	const catalog = await productService.getCategories()
	const items = menuItems.map(i => {
		if (i.title === 'Каталог') {
			return {
				...i,
				subMenu: catalog.map(c => ({
					title: c.title,
					href: `/catalog?category=${c.id}`,
					desc: c.desc
				}))
			}
		}
		return i
	})
	return (
		<header className="sticky top-0 z-50 w-full pt-1 backdrop-blur supports-[backdrop-filter]:bg-transparent">
			<div className="container flex justify-between items-center text-secondary-foreground">
				<Logo className="md:hidden w-52 lg:w-auto" />
				<Sheet>
					<SheetTrigger asChild>
						<Button
							aria-label="Меню"
							aria-labelledby="Меню"
							className="hidden bg-secondary/70 md:flex  border-foreground/10 hover:text-foreground border"
							variant="ghost"
							size="icon"
						>
							<Menu className="h-5 w-5" />
							<span className="sr-only">Меню</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<SheetHeader className="border-b pb-5 mb-5">
							<SheetClose asChild>
								<Logo />
							</SheetClose>
						</SheetHeader>
						<ul className="flex flex-col gap-3">
							{items.map((item, i) => {
								if (item.subMenu && !item.href)
									return (
										<li key={i}>
											<span className="text-sm text-muted-foreground  flex items-center gap-2">
												{item.title} <ChevronDown className="h-4 w-4 inline" />
											</span>
											<ul className="p-2 flex flex-col gap-3">
												{item.subMenu.map((subItem, i) => (
													<li key={i}>
														<Link href={subItem.href} className="text-sm">
															{subItem.title}
														</Link>
													</li>
												))}
											</ul>
										</li>
									)
								return (
									<li key={i}>
										<Link href={item.href}>{item.title}</Link>
									</li>
								)
							})}
						</ul>
					</SheetContent>
				</Sheet>
				<NavigationMenu className="bg-secondary/70 md:hidden p-1 border-[.1rem] border-foreground/10 rounded-lg">
					<NavigationMenuList>
						{items.map((item, i) => {
							if (item.subMenu)
								return (
									<NavigationMenuItem key={i}>
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
														<a
															className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
															href="/"
														>
															<LogoIcon className="text-primary" />
															<div className="mb-2 mt-4 text-lg font-medium">Геомакс</div>
															<p className="text-sm leading-tight text-muted-foreground">
																Сельское хозяйство нового поколения.
															</p>
														</a>
													</NavigationMenuLink>
												</div>
											)}
											<ul
												className={cn(
													'p-6 flex flex-wrap gap-3 justify-between items-start',
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
								<NavigationMenuItem key={i}>
									<Link href={item.href} legacyBehavior passHref>
										<NavigationMenuLink className={navigationMenuTriggerStyle()}>
											{item.title}
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							)
						})}
					</NavigationMenuList>
				</NavigationMenu>
				<AppSearch />
			</div>
		</header>
	)
}

export default Header
