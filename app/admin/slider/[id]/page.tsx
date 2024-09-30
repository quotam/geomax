'use client'

import AppEditor from '@front/entities/editor'
import { Button } from '@front/shared/ui/button'
import { Card, CardContent } from '@front/shared/ui/card'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SlideEditor({
	params
}: {
	params: { slideId: number }
}) {
	const router = useRouter()

	return (
		<div className="container mx-auto p-4">
			<Button
				variant="ghost"
				onClick={() => router.push('/admin/slider')}
				className="mb-4"
			>
				<ArrowLeft className="mr-2 h-4 w-4" /> Назад к списку слайдов
			</Button>

			<h1 className="text-2xl font-bold mb-4">Редактирование слайда</h1>

			<Card className="p-3">
				<CardContent>
					<AppEditor onChange={e => console.log(e)} />
				</CardContent>
			</Card>
		</div>
	)
}
