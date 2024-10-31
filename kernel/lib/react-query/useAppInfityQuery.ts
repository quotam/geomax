import { useAppDebounce } from '@front/kernel/hooks/useDebounce'
import { DefaultError, InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { Props, Result } from './model'

export const useAppInfiniteQuery = <
	TQueryFnData,
	TError = DefaultError,
	TData = InfiniteData<TQueryFnData>,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown
>(
	param: Props<TQueryFnData, TError, TData, TQueryKey, TPageParam>
): Result<TQueryFnData, TError, TData> => {
	const query = useInfiniteQuery(param.options)

	const makeRequest = param.debounce
		? useAppDebounce(() => {
				if (!query.isFetching && query.hasNextPage) query.fetchNextPage()
			}, param.debounce)
		: () => {
				if (!query.isFetching && query.hasNextPage) query.fetchNextPage()
			}

	const { ref, inView } = useInView({
		threshold: 0
	})

	useEffect(() => {
		if (query.hasNextPage) makeRequest()
	}, [inView])

	return {
		...query,
		ref,
		makeRequest
	}
}
