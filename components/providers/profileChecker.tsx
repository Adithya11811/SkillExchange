// components/providers/profileChecker.tsx

import { AuthProvider } from '@/components/providers/Provider'
import { db } from '@/lib/db'

// Function to get the user ID from the AuthProvider
const getUserId = async () => {
  const userIdString = await AuthProvider()
  return userIdString ? parseInt(userIdString, 10) : undefined
}

// Function to check if a profile exists for the given user ID
export const checkProfile = async () => {
  const userId = await getUserId()

  if (userId !== undefined) {
    const profile = await db.profile.findFirst({
      where: {
        userId: userId,
      },
    })
    

    return !!profile // Return true if profile exists, false otherwise
  }

  return false // Return false if userId is undefined
}

// Function to get the profile data for the given user ID
export const getProfileData = async () => {
  const userId = await getUserId()

  if (userId !== undefined) {
    const profile = await db.profile.findFirst({
      where: {
        userId: userId,
      },
    })

    return profile // Return profile data or null if not found
  }

  return null // Return null if userId is undefined
}
