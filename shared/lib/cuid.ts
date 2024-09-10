import { createId, init } from '@paralleldrive/cuid2'
export const createID = () => createId()

export const createSlug = () => init({ length: 8 })()
