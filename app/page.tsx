import CoverageMap from './_widgets/coverage'
import Faq from './_widgets/faq'
import InfoBlocks from './_widgets/infoBlocks'
import NewsSection from './_widgets/newsSection'
import Projects from './_widgets/projects'
import HeroSlider from './_widgets/slider'

export default function HomePage() {
	return (
		<main>
			<HeroSlider />
			<InfoBlocks />
			<CoverageMap />
			<Projects />
			<NewsSection />
			<Faq />
		</main>
	)
}
