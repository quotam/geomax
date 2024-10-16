import { articleService } from '@front/entities/article/_service'
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
import JSONContentRenderer from '@front/shared/ui/contentRender'
import { ArrowRight, Calendar, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Projects = async () => {
	const projects = await articleService('PROJECT').getPreview()
	return (
		<section className="py-23 mt-35 bg-foreground text-background">
			<div className="container mx-auto px-4">
				<h4 className="text-3xl font-bold mb-3 text-primary text-center">
					Выполненные проекты
					<CheckCircle strokeWidth={3} className="inline h-8 w-8 mb-2 ml-2" />
				</h4>
				<span className="text-center block mb-20">
					Откройте для себя наши достижения и успешные решения. <br />
					<Button
						variant="outline"
						className="mt-4 border-secondary text-muted-foreground"
					>
						<Link href="/projects">Архив проектов</Link>
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</span>

				<div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-3 md:px-8 sm:px-3 gap-16">
					{projects.map(project => (
						<Card key={project.id} className="flex flex-col overflow-hidden">
							<Image
								src={project.image || '/placeholder.svg'}
								alt={project.title}
								width={300}
								height={200}
								className="w-full h-48 object-cover rounded-t-lg"
							/>
							<CardHeader>
								<div className="flex justify-between items-start">
									<CardTitle className="text-xl mb-2">{project.title}</CardTitle>
									<Badge>{project.category?.title || 'Разное'}</Badge>
								</div>
								<CardDescription className="flex gap-2 items-center">
									<Calendar className="h-4 w-4" />
									<span>
										Выполнено: {new Date(project.createdAt).toLocaleDateString()}
									</span>
								</CardDescription>
							</CardHeader>
							<CardContent className="flex-grow">
								<JSONContentRenderer content={project.desc} />
							</CardContent>
							<CardFooter>
								<Button variant="outline" className="w-full">
									<Link href={`/projects/${project.id}`} className="flex items-center">
										Подробнее
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
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
