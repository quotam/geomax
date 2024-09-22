import { ThemeSwither } from '@front/kernel/lib/next-theme/themeSwither'
import { MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
	return (
		<footer className="mt-auto p-1 bg-foreground text-background">
			<div className="container flex justify-between items-center">
				<ul className="flex gap-6 text-xs text-muted-foreground">
					<li>
						<Link href="/privacy">Политика конфиденциальности </Link>
					</li>
					<li>
						<Link href="/terms">Пользовательское соглашение </Link>
					</li>
				</ul>
				<div className="flex items-center gap-6">
					<div className="flex items-center gap-4">
						<Phone className="w-4 h-4 text-primary" />
						<ul className="flex gap-4">
							<li>
								<Link href="tel:89039811862">
									8 <span className="text-primary">(903)</span> 981 1862
								</Link>
							</li>
							<li>
								<Link href="tel:83812208401">
									8 <span className="text-primary">(381)</span> 220 8401
								</Link>
							</li>
						</ul>
					</div>

					<div className="flex items-center gap-4">
						<MapPin className="w-4 h-4 text-primary" />
						<span className="text-muted-foreground">г. Омск, ул. Тарская, 300</span>
					</div>
				</div>
				<div className="flex items-center gap-2 text-xs">
					<ThemeSwither />
					<span className="text-muted-foreground">
						gpsagro.ru &copy; {new Date().getFullYear().toString()}
					</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer
