// UknwUserDetail.tsx

import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import ConnectionButton from '@/components/providers/ConnectionButton'

const UknwUserDetail: React.FC<{ userdet: { id: number } }> = async ({
  userdet,
}) => {
  // Server-side logic
  const server = await getServerSession(authOptions)
  console.log('Server session:', server)

  if (!server || !server.user || server.user.id === null) {
    redirect('/signin')
  }
  const urid = await db.user.findFirst({
    where: { username: server.user.username },
  })
  if(!urid || !urid.id){
    redirect('/signin')
  }

  // Check if a room is present between the users
  const roomIsPresent = await db.rooms.findFirst({
    where: {
      OR: [
        { participant1id: userdet.id, participant2id: urid.id },
        { participant1id: urid.id, participant2id: userdet.id },
      ],
    },
  })

  const flag = roomIsPresent !== null

  // Client-side logic
  const profile = await db.profile.findFirst({
    where: {
      userId: userdet.id,
    },
  })

  if (!profile) {
    redirect('/404')
    return null // Redirecting, so we don't render anything further
  }

  return (
    <div className="mt-20 rounded-xl flex h-4/5 w-4/5 bg-[#D2E9F6]">
      {/* left user details */}
      <div className="p-10 w-4/5 grid place-content-center shadow-lg h-full">
        <img
          src={profile.profilePhoto}
          className="object-contain h-96 w-full rounded-2xl"
          alt="profile photo"
        />
        <ConnectionButton
          flag={flag}
          user1id = {urid.id}
          user2id={profile.userId}
        />
        {/* Add more user details as needed */}
      </div>
      {/* right skill details */}
      <div className="w-full p-12">
        {/* Add skill details or any other information */}
        <div className="text-[#484848] w-80 font-bold text-6xl">
          {profile.RealName}
        </div>
        <div className="mt-6 ml-4 text-[#839DAD] font-semibold text-xl">
          AGE: 26
        </div>
        <div className="ml-4 text-[#839DAD] font-semibold text-xl">
          Contacts: {profile.contacts}{' '}
        </div>
        <div className="ml-4 mt-6 h-40 w-96 rounded-xl shadow-lg">
          <div className="p-3 text-[#484848] font-bold text-xl">BIO:</div>
          <div className="pl-8 text-[#484848]">{profile.Bio}</div>
        </div>
      </div>
    </div>
  )
}

export default UknwUserDetail
