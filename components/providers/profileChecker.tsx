// components/providers/profileChecker.tsx

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import SigninRedirectHelper from './SigninRedirectHelpers'

// Function to get the user ID from the AuthProvider
const getUserId = async () => {
  const server = await getServerSession(authOptions)
  const userEmailString = server?.user.email
  console.log("user id", userEmailString)
  if(userEmailString===undefined || userEmailString===null){
    return <SigninRedirectHelper/>
  }
  const userdet = await db.user.findFirst({
    where: {
      email: userEmailString,
    },
    select:{
      id: true
    }
  })
  console.log(typeof(userdet))

  if (userdet) {
    return userdet.id
  } else {
    // Handle the case when no user is found
    console.error('No user found with email', userEmailString)
  }
}

// Function to check if a profile exists for the given user ID
export const checkProfile = async () => {
  try {
    const userId =await getUserId()
    console.log('hola userId:', userId)

    if (userId !== undefined) {
      const profile = await db.profile.findFirst({
        where: {
          userId: Number(userId),
        },
      })

      console.log('Profile:', profile)

      if (profile !== null) {
        // If a profile is found, return the profile object
        return profile
      }
    }else{
      console.log("Abe chutiye")
    }

    // If no profile is found or userId is undefined, return null or false as needed
    return null
  } catch (error) {
    console.error('Error fetching profile:', error)
    // Handle the error as needed
    return null
  }
}
