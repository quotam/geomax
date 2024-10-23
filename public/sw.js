self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('my-pwa-cache').then(cache => {
			return cache.addAll([
				'/',
				'/manifest.json',
				'/icons/icon-192x192.png',
				'/icons/icon-512x512.png'
			])
		})
	)
})

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request)
		})
	)
})

self.addEventListener('push', event => {
	const data = event.data ? event.data.json() : {}
	event.waitUntil(
		self.registration.showNotification(data.title, {
			body: data.body,
			icon: '/icons/icon-192x192.png'
		})
	)
})
