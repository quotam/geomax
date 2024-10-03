'use client'
import { sliderQueries } from '@front/entities/slider'
import { Button } from '@front/shared/ui/button'
import { Card, CardContent } from '@front/shared/ui/card'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Edit, PlusCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function SliderAdmin() {
	const { data, refetch } = useQuery(sliderQueries.getAllAdmin)
	const { mutateAsync: deleteSlide } = useMutation(sliderQueries.delete(refetch))
	const { mutateAsync, isPending } = useMutation(sliderQueries.create(refetch))

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
			<div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-4">
				{data?.map((slide, i) => (
					<Card key={slide.id}>
						<CardContent className="p-4">
							<div className="flex justify-between items-center mt-4">
								<span
									className="text-muted-foreground"
									title={`Обновлен ${slide.updatedAt.toLocaleDateString()}`}
								>
									{slide.createdAt.toLocaleDateString()}
								</span>
								<h3 className="font-bold">Слайд {i}</h3>
								<div className="flex justify-end space-x-2">
									<Button variant="outline" size="icon">
										<Link href={`/admin/slider/${slide.id}`}>
											<Edit className="h-4 w-4" />
										</Link>
									</Button>
									<Button
										variant="destructive"
										onClick={() => deleteSlide(slide.id)}
										size="icon"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</main>
	)
}
