import { sliderService } from '@front/entities/slider/_service'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@front/shared/ui/carousel'
import JSONContentRenderer from '@front/shared/ui/contentRender'
import Hero from '@front/shared/ui/heroBg'

const HeroSlider = async () => {
	const data = await sliderService.getAll()

	return (
		<section className="-mt-16 bg-foreground text-background">
			<Carousel className="w-full">
				<Hero className="w-full min-w-100 min-h-100 sm:bottom-0 object-cover aspect-video text-background/10 h-3/4 md:h-1/2 absolute left-0 bottom-12" />
				<CarouselContent>
					{data.map(item => (
						<CarouselItem key={item.id} className="w-full mb-12 mt-48">
							<JSONContentRenderer content={item.body} />
						</CarouselItem>
					))}
				</CarouselContent>

				{data.length > 1 && (
					<div className="container relative">
						<aside className="absolute z-20 bottom-12 right-0 flex gap-6">
							<CarouselPrevious variant="ghost" className="rounded-lg" />
							<CarouselNext variant="ghost" className="rounded-lg" />
						</aside>
					</div>
				)}

				<div className="h-12 absolute bottom-0 w-full rounded-t-[6.4rem] sm:rounded-t-[2.4rem] bg-background"></div>
			</Carousel>
		</section>
	)
}

export default HeroSlider
