import { createNextRouteHandler } from 'uploadthing/next'

import { ourFileRouter } from '@/app/api/uploadthing/core'

export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingId: 'eo1tucyzqd',
    uploadthingSecret:
      'sk_live_d35880720d96462732f4e53476cd4664f2b4daceb46e6f5084556ef3ee393190',
  },
})
