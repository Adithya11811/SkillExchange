// pages/profile.js

import React from 'react'
import CreateProfile from '@/components/form/createprofile'
import RedirectHelper from '@/components/providers/redirectHelper'

import {
  checkProfile,
} from '@/components/providers/profileChecker'

const ProfilePage = async () => {
  // Check if a profile exists when rendering the component
  const Profile = await checkProfile()

  if (Profile !== null || Profile !== undefined) {
    // If the profile exists, you can also fetch and use the profile data here if needed
    const profileData = checkProfile()
    console.log('Profile Data:', profileData)

    // Redirect to the '/admin' page or perform other actions
    return (
      <RedirectHelper/>
    )

    // You might want to return null or another placeholder while redirecting
    return null
  }

  // If the profile does not exist, render the CreateProfile component
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-screen h-screen p-12">
        <div className="font-bold text-xl mb-10">Create a Profile</div>
        <CreateProfile />
      </div>
    </div>
  )
}

export default ProfilePage
