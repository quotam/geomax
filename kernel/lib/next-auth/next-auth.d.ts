import 'next-auth'
import { UserEntity, SessionEntity } from '../../domain/user'

declare module 'next-auth' {
	interface Session {
		user: SessionEntity['user']
	}
	interface User extends UserEntity {}
}
