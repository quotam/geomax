'use server'

import { getServerSession } from 'next-auth'

import { authConfig } from './authConfig'

export const getAppSessionServer = () => getServerSession(authConfig)
