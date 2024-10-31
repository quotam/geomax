import 'next-auth'

import { SessionEntity, UserEntity } from '../../domain/user'

declare module 'next-auth' {
	interface Session {
		user: SessionEntity['user']
	}
	interface User extends UserEntity {}
}
