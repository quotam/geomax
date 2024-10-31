import { IMAGE_KEY } from '@front/entities/editor/domain'
import { selectFile } from '@front/shared/lib/file'
import { Button } from '@front/shared/ui/button'
import { X } from 'lucide-react'
import { ChangeEvent } from 'react'
import { toast } from 'sonner'

import { UploadimagesAction } from '../actions/uploadImages'

export default function ImageSelector({
	value,
	onChange
}: {
	value: string[]
	onChange: (value: string[]) => void
}) {
	const handleImageUpload = () => {
		selectFile('image/*', true).then(files => {
			if (files) {
				const formData = new FormData()
				Array.from(files).forEach((file, i) => {
					formData.append(IMAGE_KEY + i, file)
				})
				toast.promise(
					UploadimagesAction(formData).then(res => {
						console.log(res)
						onChange(value.concat(res))
					}),
					{
						loading: 'Загрузка...',
						success: 'Загружено успешно.',
						error: e => e.message
					}
				)
			}
		})
	}

	return (
		<div>
			<Button
				variant="secondary"
				onClick={e => {
					e.preventDefault()
					handleImageUpload()
				}}
			>
				Загрузить изображения
			</Button>
			<div className="grid grid-cols-3 mt-4 gap-4">
				{value.map((image, index) => (
					<div className="relative" key={image}>
						<img
							key={index}
							src={image}
							alt={`Выбранное изображение ${index + 1}`}
							className="w-full h-40 object-cover rounded-md"
						/>
						<Button
							variant="destructive"
							size="icon"
							className="absolute top-2 right-2"
							onClick={() => {
								onChange(value.filter((_, i) => i !== index))
							}}
						>
							<X />{' '}
						</Button>
					</div>
				))}
			</div>
			{value.length > 0 && (
				<p className="mt-4">
					Выбрано изображений: {value.length},{' '}
					<Button
						className="text-destructive"
						variant="link"
						onClick={e => {
							e.preventDefault()
							onChange([])
						}}
					>
						Сбросить
					</Button>
				</p>
			)}
		</div>
	)
}
