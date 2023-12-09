'use client'

import useOtherUser from '@/lib/hooks/useOtherUsers'
import { User, Conversation, Profile } from '@prisma/client'
import { useMemo } from 'react'
import Link from 'next/link'
import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { ConversationType } from '@/app/types'
import Avatar from '@/components/sidebars/Avatar'
import { Video } from 'lucide-react'

interface HeaderProps {
  conversation: ConversationType
  user: User
  profile: Profile
  name: string
  roomid: string
}

const Header: React.FC<HeaderProps> = ({
  conversation,
  user,
  profile,
  name,
  roomid
}) => {
  console.log(conversation)
  const otherUser = useOtherUser(conversation, user)

  const statusText = useMemo(() => {
    return 'Active'
  }, [conversation])
  return (
    <div
      className="
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      "
    >
      <div className="flex gap-3 items-center">
        <Link
          href="/rooms"
          className="
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          "
        >
          <HiChevronLeft size={32} />
        </Link>
        {/* {conversation.isGroup ? (
          <AvatarGroup users={conversation.users} />
        ) : (
          <Avatar user={otherUser} />
        )} */}
        <Link href={`/user/${name}`}>
          <Avatar user={profile} />
        </Link>

        <div className="flex flex-col">
          <div>{conversation.name || otherUser?.username || 'hello'}</div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <Link href={`/videocall/${roomid}?q=${roomid}`}>
        <Video />
      </Link>
      {/* <HiEllipsisHorizontal
        size={32}
        onClick={() => setDrawerOpen(true)}
        className="
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          transition
        "
      /> */}
    </div>
  )
}
export default Header
