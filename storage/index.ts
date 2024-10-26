import express, { Request, Response, NextFunction } from 'express'
import path from 'path'

const app = express()
const PORT = 9000

// Путь к папке с картинками
const IMAGES_FOLDER = path.join(__dirname, 'images')

// Раздача статических файлов с помощью express.static
app.use(
	'/',
	express.static(IMAGES_FOLDER, {
		dotfiles: 'deny', // Запрещает доступ к скрытым файлам, таким как .env
		index: false, // Отключает показ списка файлов в папке
		setHeaders: (res: Response, _) => {
			// Дополнительные заголовки для безопасности
			res.set('Content-Security-Policy', "default-src 'self'")
			res.set('X-Content-Type-Options', 'nosniff')
		}
	})
)

// Обработка ошибок
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack)
	res.status(500).json({ message: 'Internal Server Error' })
})

// Запуск сервера
app.listen(PORT, () => {
	console.log(`Storage server is running on http://localhost:${PORT}`)
})
