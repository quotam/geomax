export class FileFetcher {
	constructor(private authToken?: string) {}

	async fetchText(url: string) {
		return fetch(url, {
			headers: {
				...(this.authToken
					? {
							Authorization: `Bearer ${this.authToken}`
						}
					: {})
			},
			cache: 'no-store'
		}).then(res => res.text())
	}
}
