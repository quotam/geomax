'use client'

import NotFoundPage from '@front/app/not-found'
import { sliderQueries } from '@front/entities/slider'
import UpdateSliderForm from '@front/features/cms/updateSliderForm'
import { Button } from '@front/shared/ui/button'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SldieEditePage({ params }: { params: { id: string } }) {
	const { data, isPending } = useQuery(sliderQueries.getOne(params.id))

	if (!data && !isPending) return <NotFoundPage />

	return (
		<main className="container mx-auto px-4">
			<Link href="/admin/slider">
				<Button variant="ghost" className="mb-4">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Назад к списку слайдов{' '}
				</Button>
			</Link>
			<UpdateSliderForm isPending={isPending} data={data} />
		</main>
	)
}
