import { createImageUpload } from 'novel/plugins'
import { toast } from 'sonner'
import { uploadProfileImage } from '../action/uploadImage'
import { IMAGE_KEY } from '../domain'

const onUpload = (file: File) => {
	return new Promise(resolve => {
		const formData = new FormData()
		formData.append(IMAGE_KEY, file)
		toast.promise(
			uploadProfileImage(formData).then(res => {
				let image = new Image()
				image.src = res
				image.onload = () => {
					resolve(res)
				}
			}),
			{
				loading: 'Uploading image...',
				success: 'Image uploaded successfully.',
				error: e => e.message
			}
		)
	})
}

export const uploadFn = createImageUpload({
	onUpload,
	validateFn: file => {
		if (!file.type.includes('image/')) {
			toast.error('File type not supported.')
			return false
		} else if (file.size / 1024 / 1024 > 20) {
			toast.error('File size too big (max 20MB).')
			return false
		}
		return true
	}
})
