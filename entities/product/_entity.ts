class ProductEntity {
	list = {
		id: true,
		images: true,
		title: true,
		status: true,
		meta: true,
		availability: true,
		price: true,
		desc: true,
		mataDesc: true,
		category: {
			select: {
				id: true,
				title: true,
				desc: true
			}
		},
		facturer: {
			select: {
				id: true,
				title: true
			}
		}
	}

	once = { ...this.list, body: true, meta: true }
}

export const productEntity = new ProductEntity()
