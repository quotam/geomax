import { Button } from '@front/shared/ui/button'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@front/shared/ui/carousel'
import Hero from '@front/shared/ui/heroBg'
import Image from 'next/image'
import Link from 'next/link'

const HeroSlider = () => {
	return (
		<section className="-mt-16 bg-foreground text-background">
			<Carousel
				//plugins={[
				//   Autoplay({
				//     delay: 2000,
				//   }),
				// ]}
				className="w-full"
			>
				<Hero className="w-full object-cover aspect-video text-background/10 h-3/4 md:h-1/2 absolute left-0 bottom-12" />
				<CarouselContent>
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem
							className="flex z-20 items-center justify-center w-full mb-12 mt-48"
							key={index}
						>
							<div className="flex flex-col items-center">
								<Link
									className="bg-primary text-primary-foreground shadow hover:bg-primary/90 py-2 rounded-sm px-8 font-medium"
									href="/?modal"
								>
									Задать вопрос
								</Link>
								<br />
								<br />
								<h1 className="text-[4.8rem] leading-[4.8rem] text-center">
									Чем мы можем <span className="text-primary">помочь?</span>
								</h1>
								<br />
								<br />
								<p className="text-center">
									Подберем и подключим GPS навигацию, автопилот и цифровые инструменты
									<br />
									для максимальной эффективности вашей сельскохозяйственной техники.
								</p>
								<br />
								<Image
									src="/main.png"
									alt="geomax"
									className=" object-cover max-w-full"
									width={690}
									height={490}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				<div className="container relative">
					<aside className="absolute z-20 bottom-12 right-0 flex gap-6">
						<CarouselPrevious variant="ghost" className="rounded-lg" />
						<CarouselNext variant="ghost" className="rounded-lg" />
					</aside>
				</div>

				<div className="h-12 absolute bottom-0 w-full rounded-t-[6.4rem] bg-background"></div>
			</Carousel>
		</section>
	)
}

export default HeroSlider
