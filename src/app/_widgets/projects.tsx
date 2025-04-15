import Image from 'next/image'
import Link from 'next/link'

import { getLastProjectListService } from '@front/entities/project/_service/get-last-project-list'
import { MdxCode } from '@front/shared/lib/mdx'
import { compileMDX } from '@front/shared/lib/mdx/server'
import { cn } from '@front/shared/lib/utils'
import { Button } from '@front/shared/ui/button'
import { random } from 'lodash-es'

const Projects = async () => {
	const projects = await getLastProjectListService.exec()

	const compiled = await Promise.all(
		projects.map(async e => ({
			...e,
			description: await compileMDX(e.description).then(r => r.code)
		}))
	)

	if (projects.length === 0) return null

	return (
		<section className="py-23 bg-foreground text-background">
			<div className="container mx-auto px-4">
				<h4 className="text-heading font-bold mb-3 text-center">Выполненные проекты</h4>
				<span className="text-center block mb-12 text-muted-foreground ">
					Откройте для себя наши достижения и успешные решения. <br />
					<Button variant="link" className="underline hover:no-underline">
						<Link href="/project">Архив проектов</Link>
					</Button>
				</span>

				<div className="grid grid-cols-3 md:px-8 sm:px-3 gap-6">
					{compiled.map((project, i) => (
						<Link
							aria-label={project.title}
							title={project.title}
							key={i}
							href={`/project/${project.slug}`}
							className={cn(
								'group block relative md:col-span-3 rounded-sm overflow-hidden',
								Math.floor(i / 2) % 2 === i % 2 ? 'col-span-2' : 'col-span-1'
							)}
						>
							<div className="relative h-[46rem] md:h-[40rem] sm:h-[30rem] w-full overflow-hidden z-10">
								<Image
									src={project.thumbnail ? project.imagePath + project.thumbnail : '/placeholder.svg'}
									alt={project.title}
									className="object-cover transition-transform duration-300 group-hover:scale-105 z-20 opacity-90"
									loading="lazy"
									sizes="(max-width: 600px) 90vw, 1280px"
									fill
								/>
								{Array.from({ length: 2 }).map((_, i) => (
									<div
										key={i}
										className={cn(
											'absolute top-0 left-0 w-full h-full blur-2xl z-30 to-transparent/0 opacity-10',
											(() => {
												switch (random(0, 3)) {
													case 0:
														return 'from-primary/80'
													case 1:
														return 'from-primary/70'
													case 2:
														return 'from-primary/60'
													case 3:
														return 'from-primary/50'
												}
											})(),
											(() => {
												switch (random(0, 3)) {
													case 0:
														return 'bg-gradient-to-r'
													case 1:
														return 'bg-gradient-to-t'
													case 2:
														return 'bg-gradient-to-b'
													case 3:
														return 'bg-gradient-to-l'
												}
											})()
										)}
									/>
								))}
							</div>
							<div className="p-5 absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 left-0 w-full bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/60 z-20 h-full flex flex-col justify-end">
								<h5 className="text-2xl font-bold mb-1 text-white">{project.title}</h5>
								<MdxCode
									className="prose-invert"
									code={project.description}
									imagePath={project.imagePath}
									size="lg"
								/>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}
export default Projects
