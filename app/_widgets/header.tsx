import Link from 'next/link'
import { cn } from '@front/shared/lib/utils'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle
} from '@front/shared/ui/navigation-menu'
import { forwardRef } from 'react'
import LogoIcon from '@front/shared/ui/logoIcon'
import AppSearch from '@front/features/search/pub/search'

const components: { title: string; href: string; description: string }[] = [
	{
		title: 'Alert Dialog',
		href: '/docs/primitives/alert-dialog',
		description:
			'A modal dialog that interrupts the user with important content and expects a response.'
	},
	{
		title: 'Alert Dialog',
		href: '/docs/primitives/alert-dialog',
		description:
			'A modal dialog that interrupts the user with important content and expects a response.'
	},
	{
		title: 'Alert Dialog',
		href: '/docs/primitives/alert-dialog',
		description:
			'A modal dialog that interrupts the user with important content and expects a response.'
	},
	{
		title: 'Alert Dialog',
		href: '/docs/primitives/alert-dialog',
		description:
			'A modal dialog that interrupts the user with important content and expects a response.'
	},
	{
		title: 'Alert Dialog',
		href: '/docs/primitives/alert-dialog',
		description:
			'A modal dialog that interrupts the user with important content and expects a response.'
	},
	{
		title: 'Alert Dialog',
		href: '/docs/primitives/alert-dialog',
		description:
			'A modal dialog that interrupts the user with important content and expects a response.'
	}
]

const Header = () => {
	return (
		<header className="sticky top-0 z-50 w-full  p-1 backdrop-blur supports-[backdrop-filter]:bg-transparent">
			<div className="container flex justify-between items-center text-secondary-foreground">
				<Link href="/" className="text-primary flex items-center gap-3">
					<LogoIcon />
					<h1 className="text-2xl font-medium uppercase">Геомакс</h1>
				</Link>
				<NavigationMenu className="bg-secondary/70 p-1 border-[.1rem] border-foreground/10 rounded-lg">
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger className="bg-secondary text-secondary-foreground">
								О компании
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="flex gap-3 p-6 justify-between w-[64rem]">
									<li className="w-[60rem]">
										<NavigationMenuLink asChild>
											<a
												className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
												href="/"
											>
												<LogoIcon className="text-primary" />
												<div className="mb-2 mt-4 text-lg font-medium">Geomax</div>
												<p className="text-sm leading-tight text-muted-foreground">
													Сельское хозяйство нового поколения.
												</p>
											</a>
										</NavigationMenuLink>
									</li>
									<div>
										<ListItem href="/faq" title="FAQ">
											Ответы на часто задаваемые вопросы, FAQ
										</ListItem>
										<ListItem href="/docs/installation" title="Выполненные проекты">
											В этом разделе примеры наших успешных проектов, иллюстрирующие
											профессионализм и индивидуальный подход.
										</ListItem>
										<ListItem href="/docs/primitives/typography" title="Реквизиты">
											Юридическая информация.
										</ListItem>
									</div>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Каталог</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="w-[64rem] p-6 flex flex-wrap gap-3 justify-between items-start">
									{components.map(component => (
										<ListItem
											key={component.title}
											title={component.title}
											href={component.href}
											className="w-70"
										>
											{component.description}
										</ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link href="/docs" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Калькулятор экономии
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link href="/docs" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Сезонные предложения
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link href="/docs" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Новости
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link href="/docs" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Контакты
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<AppSearch />
			</div>
		</header>
	)
}
const ListItem = forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = 'ListItem'

export default Header
