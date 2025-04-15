import { getSliderContentService } from '@front/entities/slider/server'
import { MdxCode } from '@front/shared/lib/mdx'
import { compileMDX } from '@front/shared/lib/mdx/server'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@front/shared/ui/carousel'
import Hero from '@front/shared/ui/heroBg'

const HeroSlider = async () => {
	const data = await getSliderContentService.exec()

	const compileData = await Promise.all(
		data.slids.map(async e => ({
			...e,
			body: await compileMDX(e.body).then(r => r.code)
		}))
	)

	return (
		<section className="-mt-16 bg-foreground text-background">
			<Carousel className="w-full">
				<Hero className="w-full min-w-100 min-h-100 sm:bottom-0 object-cover aspect-video text-background/10 h-3/4 md:h-1/2 absolute left-0 bottom-12" />
				<CarouselContent className="px-2">
					{compileData
						.filter(i => i.order)
						.map((item, i) => (
							<CarouselItem key={i} className="w-full mb-12 mt-48">
								<MdxCode className="w-full" imagePath={data.imagePath} variant="invert" code={item.body} />
							</CarouselItem>
						))}
				</CarouselContent>

				{data.slids.length > 1 && (
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
