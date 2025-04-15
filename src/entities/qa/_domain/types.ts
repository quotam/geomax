import { Cuid } from '@front/kernel/domain/types'

/**
 * @field question строка - вопрос
 * @field answer MDX-контент - ответ
 * @example
 * {
 *   id: "lj23cuidsome",
 *   question: "What is your name?",
 *   answer: "My name is John Doe"
 * }
 */

export type QaEntity = {
	id: Cuid
	question: string
	answer: string
}
