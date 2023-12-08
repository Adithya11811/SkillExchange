'use client';

import axios from 'axios'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'

import LoadingModal from './LoadingModal'



interface UserBoxProps {
  data: User
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  console.log(data)

  const handleClick = useCallback(() => {
    setIsLoading(true)

    axios
      .post('/api/conversations', { userId: data.id })
      .then((data) => {
        router.push(`/conversation/${data.data.id}`)
      })
      .finally(() => setIsLoading(false))
  }, [data, router])

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
        
          p-3
          rounded-lg
          transition
          cursor-pointer
        "
      >
        {/* <AvatarParser data={data} /> */}
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{data.username}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserBox
