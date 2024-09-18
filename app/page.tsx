import { CheckCircle } from 'lucide-react'
import CoverageMap from './_widgets/coverage'
import InfoBlocks from './_widgets/infoBlocks'
import HeroSlider from './_widgets/slider'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@front/shared/ui/carousel'
import Link from 'next/link'

export default function Home() {
	return (
		<main>
			<HeroSlider />
			<InfoBlocks />
			<CoverageMap />
			<section className="bg-foreground py-32 relative pl-18 mt-32">
				<h4 className="text-heading font-bold text-center mb-14 text-primary">
					Выполненные проекты{' '}
					<CheckCircle strokeWidth={3} className="inline mb-2 ml-3 w-8 h-8" />
				</h4>
				<Carousel className="w-full">
					<div className="ml-85">
						<CarouselContent className="-ml-1">
							{Array.from({ length: 10 }).map((_, index) => (
								<CarouselItem key={index} className="pl-1 basis-1/3">
									<div className="w-100 h-100 bg-background rounded-lg">pasd</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</div>
					<h5 className="text-background w-60 italic text-xl absolute z-20 top-15 left-0">
						Откройте для себя наши достижения и успешные решения
					</h5>
					<Link
						className="text-muted-foreground absolute z-20 top-44 underline hover:no-underline left-0"
						href="/projects"
					>
						Архив наших проектов
					</Link>
					<aside className="absolute z-20 top-79 left-0 flex gap-4">
						<CarouselPrevious variant="secondary" className="rounded-lg" />
						<CarouselNext variant="secondary" className="rounded-lg" />
					</aside>
				</Carousel>
			</section>
		</main>
	)
}
