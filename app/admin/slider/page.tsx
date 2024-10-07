'use client'
import Loading from '@front/app/loading'
import { sliderQueries } from '@front/entities/slider'
import {
	getProfileDisplayName,
	getProfileLetters
} from '@front/entities/user/profile'
import { Button } from '@front/shared/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from '@front/shared/ui/card'
import JSONContentRenderer from '@front/shared/ui/contentRender'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@front/shared/ui/tooltip'
import { SliderStatus } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Calendar, Edit, Pen, PlusCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function SliderAdmin() {
	const {
		data,
		isPending: isPendingData,
		refetch
	} = useQuery(sliderQueries.getAllAdmin)
	const { mutateAsync: deleteSlide } = useMutation(sliderQueries.delete(refetch))
	const { mutateAsync, isPending } = useMutation(sliderQueries.create(refetch))

	if (isPendingData) return <Loading />

	return (
		<main className="p-4 w-full">
			<div className="flex flex-wrap justify-between items-center">
				<h2 className="text-2xl font-bold mb-4">Управление главным слайдером</h2>

				<Button
					onClick={() => mutateAsync()}
					className="mb-4"
					variant="secondary"
					disabled={isPending}
				>
					<PlusCircle className="mr-2 h-4 w-4" /> Добавить слайд
				</Button>
			</div>
			<div className="grid grid-cols-1 gap-4">
				{data?.map((slide, i) => (
					<Card key={slide.id}>
						<CardHeader className="p-4 flex-row items-center gap-2">
							<p className="mt-1">
								Cтатус: <span className="font-bold text-primary">{slide.status}</span> \
								Создан:{' '}
							</p>
							<Tooltip>
								<TooltipTrigger className="cursor-pointer p-0 font-bold">
									{slide.user ? getProfileDisplayName({ ...slide.user }) : 'неизвестен'}
								</TooltipTrigger>
								<TooltipContent>
									<Link
										className="font-bold underline hover:no-underline"
										href={`mailto:${slide.user?.email}`}
									>
										{slide.user?.role + ' - ' + slide.user?.email!}
									</Link>
								</TooltipContent>
							</Tooltip>
						</CardHeader>
						<CardContent className="bg-foreground text-background p-0">
							<div className="w-full pt-48">
								<JSONContentRenderer content={slide.body} />
							</div>
						</CardContent>
						<CardFooter className="p-4 flex justify-between items-center mt-4 ">
							<Tooltip>
								<TooltipTrigger className="cursor-pointer p-0 m-0 font-bold">
									<Calendar className="mr-2 h-4 w-4 mb-1 inline" />{' '}
									{slide.createdAt.toLocaleDateString()}
								</TooltipTrigger>
								<TooltipContent className="text-center">
									<Pen className="mr-2 h-3 w-3 inline" /> Последнее изменение <br />
									{slide.updatedAt.toLocaleDateString()}
								</TooltipContent>
							</Tooltip>
							<h3 className="font-bold">Слайд {i + 1}</h3>
							<div className="flex justify-end space-x-2">
								<Button variant="outline" size="icon">
									<Link href={`/admin/slider/${slide.id}`}>
										<Edit className="h-4 w-4" />
									</Link>
								</Button>
								<Button
									variant="destructive"
									onClick={() =>
										slide.status === SliderStatus.PUBLISHED
											? confirm('Вы уверены? Статус слайда ' + slide.status) &&
												deleteSlide(slide.id)
											: deleteSlide(slide.id)
									}
									size="icon"
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	)
}
