import {
	DefaultError,
	DefinedInitialDataInfiniteOptions,
	DefinedUseInfiniteQueryResult,
	InfiniteData,
	QueryKey,
	UndefinedInitialDataInfiniteOptions,
	UseInfiniteQueryOptions,
	UseInfiniteQueryResult
} from '@tanstack/react-query'

export type Props<
	TQueryFnData,
	TError = DefaultError,
	TData = InfiniteData<TQueryFnData>,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown
> = {
	debounce?: number
	options:
		| DefinedInitialDataInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>
		| UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>
		| UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey, TPageParam>
}
export type Result<TQueryFnData, TError = DefaultError, TData = InfiniteData<TQueryFnData>> = {
	makeRequest: () => void
	ref: (node?: Element | null | undefined) => void
} & (DefinedUseInfiniteQueryResult<TData, TError> | UseInfiniteQueryResult<TData, TError>)
