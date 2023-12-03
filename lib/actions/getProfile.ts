import { db } from '../db'
import getCurrentUser from './getCurrentUser'

const getProfile = async () => {
  try {
    const user = await getCurrentUser()

    if (!user?.email) {
      return null
    }

    const UserProfile = await db.profile.findUnique({
      where: {
        userId: user.id as number
      },
    })

    if (!UserProfile) {
      return null
    }

    return UserProfile
  } catch (error: any) {
    return null
  }
}

export default getProfile
