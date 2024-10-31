'use client'

import NotFoundPage from '@front/app/not-found'
import { productQueries } from '@front/entities/product/_queries'
import UpdateProductForm from '@front/features/cms/updateProductForm'
import { Button } from '@front/shared/ui/button'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const EditeAdminPage = ({ params }: { params: { id: string } }) => {
	const { data, isPending } = useQuery(productQueries.getOnce(params.id))
	if (!data && !isPending) return <NotFoundPage />

	return (
		<main className="container mx-auto px-4">
			<Link href="/admin/product">
				<Button variant="ghost" className="mb-4">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Назад к списку продуктов{' '}
				</Button>
			</Link>
			<UpdateProductForm
				isPending={isPending}
				data={{
					...data!,
					...(data?.category && { categoryId: data.category.id }),
					...(data?.facturer && { facturerId: data.facturer.id })
				}}
			/>
		</main>
	)
}

export default EditeAdminPage
