import Image from 'next/image'

import { Badge } from '@front/shared/ui/badge'
import { Button } from '@front/shared/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@front/shared/ui/card'
import { ArrowRight, Calendar, CheckCircle, Users } from 'lucide-react'
import Link from 'next/link'

const projects = [
	{
		id: 1,
		title: 'Smart City Infrastructure',
		description:
			'Implemented IoT sensors and data analytics to optimize traffic flow and reduce energy consumption in a major metropolitan area.',
		image: '/placeholder.svg',
		date: '2023-05-15',
		client: 'Metropolis City Council',
		category: 'Smart Cities'
	},
	{
		id: 2,
		title: 'AI-Powered Healthcare Assistant',
		description:
			'Developed an AI chatbot to assist patients with scheduling appointments, answering medical queries, and providing personalized health tips.',
		image: '/placeholder.svg',
		date: '2023-03-01',
		client: 'Global Health Systems',
		category: 'Healthcare'
	},
	{
		id: 3,
		title: 'Blockchain Supply Chain Solution',
		description:
			'Created a blockchain-based system to enhance transparency and traceability in the global food supply chain.',
		image: '/placeholder.svg',
		date: '2022-11-30',
		client: 'FreshTrack Foods',
		category: 'Supply Chain'
	},
	{
		id: 4,
		title: 'Virtual Reality Training Platform',
		description:
			'Designed and implemented a VR platform for industrial safety training, reducing on-site accidents by 40%.',
		image: '/placeholder.svg',
		date: '2022-09-15',
		client: 'SafetyFirst Industries',
		category: 'VR/AR'
	}
]

const Projects = () => {
	return (
		<section className="py-23 mt-35 bg-foreground text-background">
			<div className="container mx-auto px-4">
				<h4 className="text-3xl font-bold mb-3 text-primary text-center">
					Выполненные проекты
					<CheckCircle strokeWidth={3} className="inline h-8 w-8 mb-2 ml-2" />
				</h4>
				<span className="text-center block text-muted-foreground mb-20">
					Откройте для себя наши достижения и успешные решения. <br />
					<Link
						href="/projects"
						className="underline hover:no-underline hover:text-background"
					>
						Архив проектов
					</Link>
				</span>

				<div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-3 gap-16">
					{projects.map(project => (
						<Card key={project.id} className="flex flex-col overflow-hidden">
							<Image
								src={project.image}
								alt={project.title}
								width={300}
								height={200}
								className="w-full h-48 object-cover rounded-t-lg"
							/>
							<CardHeader>
								<div className="flex justify-between items-start">
									<CardTitle className="text-xl mb-2">{project.title}</CardTitle>
									<Badge>{project.category}</Badge>
								</div>
								<CardDescription>{project.description}</CardDescription>
							</CardHeader>
							<CardContent className="flex-grow">
								<div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
									<Calendar className="h-4 w-4" />
									<span>Выполнено: {project.date}</span>
								</div>
								<div className="flex items-center space-x-2 text-sm text-muted-foreground">
									<Users className="h-4 w-4" />
									<span>Клиент: {project.client}</span>
								</div>
							</CardContent>
							<CardFooter>
								<Button variant="outline" className="w-full">
									Подробнее
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
export default Projects
