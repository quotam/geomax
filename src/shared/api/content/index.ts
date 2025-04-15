import { privateConfig } from '@front/shared/config/privateConfig'

import { ContentApi } from './_content-api'
import { NextJsCacheStrategy } from './_lib/cacheStrategy'
import { ContentParser } from './_lib/content-parser'
import { FileFetcher } from './_lib/file-fetcher'

export const contentApi = new ContentApi(privateConfig.CONTENT_URL, {
	contentParser: new ContentParser(),
	fileFetcher: new FileFetcher(privateConfig.AUTH_TOKEN),
	cacheStrategy: new NextJsCacheStrategy()
})
