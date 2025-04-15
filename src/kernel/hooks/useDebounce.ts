'use client'

import { useMemo } from 'react'

import { debounce } from 'lodash-es'

import { useLatest } from './useLatest'

export const useAppDebounce = <T extends unknown[]>(
	callback: (...args: T) => void,
	time: number
) => {
	const latestCb = useLatest(callback)

	return useMemo(
		() =>
			debounce((...args: T) => {
				latestCb.current(...args)
			}, time),
		[time, latestCb]
	)
}
