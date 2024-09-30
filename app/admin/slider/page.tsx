'use client'

import { useState } from 'react'
import { Button } from '@front/shared/ui/button'
import { Input } from '@front/shared/ui/input'
import { Textarea } from '@front/shared/ui/textarea'
import { Card, CardContent } from '@front/shared/ui/card'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

interface Slide {
	id: number
	title: string
	description: string
	imageUrl: string
}
const slides = [
	{
		id: 1,
		title: 'Слайд 1',
		description: 'Описание слайда 1',
		imageUrl: '/placeholder.svg'
	},
	{
		id: 2,
		title: 'Слайд 2',
		description: 'Описание слайда 2',
		imageUrl: '/placeholder.svg'
	}
]

export default function SliderAdmin() {
	function handleAddSlide(): void {
		throw new Error('Function not implemented.')
	}

	return (
		<main className="p-4 w-full">
			<div className="flex flex-wrap justify-between items-center">
				<h2 className="text-2xl font-bold mb-4">Управление главным слайдером</h2>

				<Button onClick={handleAddSlide} className="mb-4" variant="secondary">
					<PlusCircle className="mr-2 h-4 w-4" /> Добавить слайд
				</Button>
			</div>
			<div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-4">
				{slides.map(slide => (
					<Card key={slide.id}>
						<CardContent className="p-4">
							<img
								src={slide.imageUrl}
								alt={slide.title}
								className="w-full h-40 object-cover mb-2 rounded-t-lg"
							/>
							<div className="flex justify-between items-center mt-4">
								<h3 className="font-bold">{slide.title}</h3>
								<div className="flex justify-end space-x-2">
									<Button variant="outline" size="icon">
										<Edit className="h-4 w-4" />
									</Button>
									<Button variant="destructive" size="icon">
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
