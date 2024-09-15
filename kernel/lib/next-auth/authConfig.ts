import { userService } from '@front/entities/user/profile.server'
import { privateConfig } from '@front/shared/config/privateConfig'
import dbClient from '@front/shared/lib/dbClient'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compact } from 'lodash-es'
import { AuthOptions, NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import OsuProvider from 'next-auth/providers/osu'
import VkProvider from 'next-auth/providers/vk'

export const authConfig: NextAuthOptions = {
	adapter: {
		...PrismaAdapter(dbClient),
		createUser: async user => {
			return userService.createUser(user)
		}
	} as AuthOptions['adapter'],
	callbacks: {
		jwt: async ({ token, trigger, user, session }) => {
			if (trigger === 'update') {
				if (session) {
					token.image = session.user.image
					token.slug = session.user.slug
					token.name = session.user.name
				}
			}

			if (user) {
				token.image = user.image
				token.slug = user.slug
				token.role = user.role
			}
			return token
		},
		session: async ({ session, token }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.sub,
					image: token.image as string,
					role: token.role,
					slug: token.slug
				}
			}
		}
	},
	session: {
		strategy: 'jwt'
	},
	providers: compact([
		EmailProvider({
			server: privateConfig.MAILER,
			from: `Koyomi <${privateConfig.MAILER.auth.user}>`
		}),
		GoogleProvider({
			clientId: privateConfig.GOOGLE_CLIENT_ID,
			clientSecret: privateConfig.GOOGLE_SECRET
		})
	]),
	pages: {
		signIn: '/auth',
		verifyRequest: '/auth/verify',
		newUser: '/auth/signup',
		error: '/auth'
	}
}
