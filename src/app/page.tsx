import CoverageMap from './_widgets/coverage'
import Faq from './_widgets/faq'
import InfoBlocks from './_widgets/infoBlocks'
import Projects from './_widgets/projects'
import HeroSlider from './_widgets/slider'

export default async function HomePage() {
	return (
		<main>
			<HeroSlider />
			<InfoBlocks />
			<CoverageMap />
			<Projects />
			<Faq />
		</main>
	)
}
