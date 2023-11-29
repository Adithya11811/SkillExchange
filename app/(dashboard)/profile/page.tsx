// pages/profile.js

import React from 'react'
import CreateProfile from '@/components/form/createprofile'


const ProfilePage = async () => {
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
