import { Button } from '@front/shared/ui/button'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@front/shared/ui/carousel'
import Hero from '@front/shared/ui/heroBg/hero'
import Image from 'next/image'
import Link from 'next/link'
//import Autoplay from "embla-carousel-autoplay"

const HeroSlider = () => {
	return (
		<section className="-mt-16 bg-foreground text-background">
			<Carousel
				//plugins={[
				//   Autoplay({
				//     delay: 2000,
				//   }),
				// ]}
				className="w-full h-[90rem]"
			>
				<Hero className="w-full text-background/10 h-3/4 absolute left-0 bottom-5" />
				<CarouselContent>
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem
							className="flex z-20 items-end justify-center w-full p-3 h-[90rem]"
							key={index}
						>
							<div className="p-1 flex flex-col items-center">
								<Button>Заявка на консультацию</Button>
								<br />
								<br />
								<h2 className="text-[4.8rem] text-center">
									Чем мы можем <span className="text-primary">помочь?</span>
								</h2>
								<br />
								<br />
								<p className="text-center">
									Подберем и подключим GPS навигацию, автопилот и цифровые инструменты
									<br />
									для максимальной эффективности вашей сельскохозяйственной техники.
								</p>
								<br />
								<Image src="/main.png" alt="geomax" width={690} height={490} />
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				<div className="container relative">
					<aside className="absolute z-20 bottom-4 right-0 flex gap-4">
						<CarouselPrevious variant="ghost" className="rounded-lg" />
						<CarouselNext variant="ghost" className="rounded-lg" />
					</aside>
				</div>

				<div className="h-3 absolute bottom-0 w-full rounded-t-lg bg-background"></div>
			</Carousel>
		</section>
	)
}

export default HeroSlider
