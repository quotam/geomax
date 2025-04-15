/**
 * Сущность слайдера для хранения контента и порядка отображения
 * @field order Порядковый номер слайда >= 0
 * @field body MDX-контент слайда
 * @example
 * {
 *   order: 1,
 *   body: "##Welcome to our site.."
 * }
 */
export type SliderEntity = {
	order: number
	body: string
}
