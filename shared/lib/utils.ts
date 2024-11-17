import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function calculateReadingTime(text: string): string {
	const wordsPerMinute = 200
	const wordCount = text.trim().split(/\s+/).length // Подсчет слов в тексте
	const minutes = Math.ceil(wordCount / wordsPerMinute)

	if (minutes < 1) return 'меньше минуты'
	if (minutes === 1) return '1 минута'
	return `${minutes} минут`
}

export const PriceToRub = (price: number) =>
	new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		currencyDisplay: 'narrowSymbol'
	}).format(price)
