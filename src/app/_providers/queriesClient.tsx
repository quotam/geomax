import { ReactNode, useState } from 'react'

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
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
							toast.error('Что-то пошло не так..')
						}
					}
				}
			})
	)

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
export default QueriesClient
