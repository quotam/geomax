import Link from 'next/link'

import { ThemeSwither } from '@front/kernel/lib/next-theme/themeSwither'
import { publicConfig } from '@front/shared/config/publicConfig'
import LogoIcon from '@front/shared/ui/logoIcon'
import { MapPin, Phone } from 'lucide-react'

const Footer = () => {
	return (
		<footer className="mt-auto p-1 bg-foreground text-background">
			<div className="container md:flex-col md:gap-3 flex justify-between sm:items-start items-center">
				<ul className="flex gap-6  md:mt-3 xs:flex-col xs:gap-3 text-xs text-muted-foreground">
					<li>
						<Link className="hover:underline" href="/privacy">
							Политика конфиденциальности{' '}
						</Link>
					</li>
					<li>
						<Link className="hover:underline" href="/terms">
							Пользовательское соглашение{' '}
						</Link>
					</li>
				</ul>
				<div className="flex xs:items-start flex-wrap  xs:flex-col items-center sm:gap-3 gap-6 ">
					<div className="flex items-center gap-4">
						<Phone className="w-4 h-4 text-primary" />
						<ul className="flex gap-4">
							{publicConfig.contacts.phones.map(p => (
								<li key={p.phone}>
									<Link className="hover:underline" href={`tel:${p.phone}`}>
										{p.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="flex items-center gap-4">
						<MapPin className="w-4 h-4 text-primary" />
						<span className="text-muted-foreground">{publicConfig.contacts.address.label}</span>
					</div>
				</div>
				<div className="flex items-center gap-2 text-xs">
					<ThemeSwither />
					<span className="text-muted-foreground flex items-center gap-1">
						<LogoIcon className="h-4 w-4" />
						agro-nav.ru &copy; {new Date().getFullYear().toString()}
					</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer
