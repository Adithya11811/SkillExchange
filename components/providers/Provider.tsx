import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const AuthProvider = async () => {
    const server = await getServerSession(authOptions)
  return server?.user.id
}


