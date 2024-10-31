import { errorCatcher } from '@front/kernel/lib/axios/helpers'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'

const QueriesClient = ({ children }: { children: ReactNode }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				queryCache: new QueryCache({
					onError: async error => {
						console.log(error.message)
					}
				}),
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false
					},
					mutations: {
						onError: async error => {
							console.log(error.message)
							if (error instanceof AxiosError) toast.error(errorCatcher(error))
							else toast.error('Что-то пошло не так..')
						}
					}
				}
			})
	)

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
export default QueriesClient
