import { initTRPC } from '@trpc/server'

import { ExperessContext } from '../server'

const t = initTRPC.context<ExperessContext>().create()
export const router = t.router
export const publicProcedure = t.procedure
