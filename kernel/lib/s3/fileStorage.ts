import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { privateConfig } from '@front/shared/config/privateConfig'
import cuid2, { createId } from '@paralleldrive/cuid2'
import fs from 'fs'
import path from 'path'

export type StoredFile = {
	id: string
	name: string
	path: string
	prefix: string
	type: string
	eTag?: string
}

class FileStorage {
	private s3Client = new S3Client({
		forcePathStyle: true,
		endpoint: privateConfig.S3_ENDPOINT,
		region: privateConfig.S3_REGION,
		credentials: {
			accessKeyId: privateConfig.S3_ACCESS_KEY_ID,
			secretAccessKey: privateConfig.S3_SECRET_ACCESS_KEY
		}
	})

	cuid = cuid2.init()
	async uploadImage(file: File, tag: string): Promise<StoredFile> {
		// Генерация уникального идентификатора
		const id = this.cuid()

		// Определение пути сохранения файла
		const uploadDirectory = path.join(process.cwd(), 'storage', 'images')

		// Убедитесь, что директория существует, если нет - создаем
		if (!fs.existsSync(uploadDirectory)) {
			fs.mkdirSync(uploadDirectory, { recursive: true })
		}

		// Определение имени файла и его пути
		const fileName = `${id}-${file.name}`
		const filePath = path.join(uploadDirectory, fileName)

		// Чтение содержимого файла
		const fileBuffer = await file.arrayBuffer()
		fs.writeFileSync(filePath, Buffer.from(fileBuffer))

		// Формирование объекта StoredFile
		const storedFile: StoredFile = {
			id,
			name: file.name,
			path: '/storage/' + id + '-' + file.name,
			prefix: tag,
			type: file.type,
			eTag: undefined // Можно добавить, если есть логика для генерации eTag
		}

		return storedFile
		//NOTE: some s3 methods
		//return this.upload(file, privateConfig.S3_IMAGES_BUCKET, tag)
	}

	async upload(file: File, bucket: string, tag: string): Promise<StoredFile> {
		const res = await new Upload({
			client: this.s3Client,
			params: {
				ACL: 'public-read',
				Bucket: bucket,
				Key: `${tag}-${Date.now().toString()}-${file.name}`,
				Body: file
			},
			queueSize: 4, // optional concurrency configuration
			partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
			leavePartsOnError: false // optional manually handle dropped parts
		}).done()

		return {
			id: createId(),
			name: file.name,
			type: file.type,
			path: `/storage/${bucket}/${res.Key}`,
			prefix: '/storage',
			eTag: res.ETag
		}
	}
}

export const fileStorage = new FileStorage()
