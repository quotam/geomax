import { createImageUpload } from 'novel/plugins'
import { toast } from 'sonner'

import { uploadStorageFile } from '../action/uploadImage'
import { IMAGE_KEY } from '../domain'

export const onUpload = (file: File) => {
	return new Promise(resolve => {
		const formData = new FormData()
		formData.append(IMAGE_KEY, file)
		toast.promise(
			uploadStorageFile(formData).then(res => {
				let image = new Image()
				image.src = res
				image.onload = () => {
					resolve(res)
				}
			}),
			{
				loading: 'Загрузка...',
				success: 'Загружено успешно.',
				error: e => e.message
			}
		)
	})
}

export const validateFn = (file: File) => {
	if (!file.type.includes('image/')) {
		toast.error('Формат файла не поддерживается.')
		return false
	} else if (file.size / 1024 / 1024 > 20) {
		toast.error('Файл слишком большой (max 20MB).')
		return false
	}
	return true
}

export const uploadFn = createImageUpload({
	onUpload,
	validateFn
})
