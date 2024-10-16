class ProductEntity {
	list = {
		id: true,
		images: true,
		title: true,
		status: true,
		availability: true,
		price: true,
		desc: true,
		category: {
			select: {
				id: true,
				title: true
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
