import { useLayoutEffect, useRef } from 'react'

export function useLatest<T extends unknown[]>(value: (...args: T) => void) {
	const latestValue = useRef(value)

	useLayoutEffect(() => {
		latestValue.current = value
	})

	return latestValue
}
