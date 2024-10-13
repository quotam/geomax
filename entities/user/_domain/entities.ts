class UserEntity {
	fullUser = {
		id: true,
		createdAt: true,
		updatedAt: true,

		name: true,
		email: true,

		image: true,
		slug: true,
		role: true
	}

	strictUser = {
		id: true,
		name: true,
		image: true,
		role: true,
		slug: true
	}
}

export const userEntity = new UserEntity()
