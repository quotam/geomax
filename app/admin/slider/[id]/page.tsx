'use client'

import Loading from '@front/app/loading'
import NotFoundPage from '@front/app/not-found'
import { sliderQueries } from '@front/entities/slider'
import UpdateSliderForm from '@front/features/updateSliderForm'
import { Button } from '@front/shared/ui/button'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SlideEditor({ params }: { params: { id: string } }) {
	const { data, isPending } = useQuery(sliderQueries.getOne(params.id))

	if (isPending) return <Loading />
	if (!data) return <NotFoundPage />

	return (
		<div className="container mx-auto p-4">
			<Link href="/admin/slider">
				<Button variant="ghost" className="mb-4">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Назад к списку слайдов{' '}
				</Button>
			</Link>
			<UpdateSliderForm data={data} />
		</div>
	)
}
