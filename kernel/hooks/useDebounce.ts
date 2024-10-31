'use client'

import { debounce } from 'lodash-es'
import { useMemo } from 'react'

import { useLatest } from './useLatest'

export const useAppDebounce = (callback: any, time: number) => {
	const latestCb = useLatest(callback)

	return useMemo(
		() =>
			debounce((...args) => {
				latestCb.current(...args)
			}, time),
		[time, latestCb]
	)
}
