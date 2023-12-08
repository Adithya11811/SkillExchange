import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Conversation, Profile, User } from '@prisma/client'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import { ConversationType, FullConversationType } from '@/app/types'
import clsx from 'clsx'
import useOtherUsers from '@/lib/hooks/useOtherUsers'
import UserBox from '../rooms/UserBox'
import Avatar from '@/components/sidebars/Avatar'
// ... (imports remain the same)

interface UserAndProfile {
  user: User
  profile: Profile
}

interface ConversationBoxProps {
  data: FullConversationType
  selected?: boolean
  users: UserAndProfile
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  users,
  selected,
}) => {
  const session = useSession()
  const router = useRouter()

  const handleClick = useCallback(() => {
    router.push(`/conversation/${data.id}`)
  }, [data.id, router])

  const lastMessage = useMemo(() => {
    const messages = data.messages || []
    return messages[data.messages.length-1]
  }, [data.messages])

  const userEmail = useMemo(() => users?.user.email, [users?.user.email])

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false
    }

    const seenArray = lastMessage.seen || []

    if (!userEmail) {
      return false
    }
    return seenArray.email === userEmail
  }, [userEmail, lastMessage])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image'
    }

    if (lastMessage?.body) {
      return lastMessage?.body
    }

    return 'Started a conversation'
  }, [lastMessage])

  const { profile, user } = users

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'w-full',
        'relative',
        'flex',
        'items-center',
        'space-x-3',
        'p-3',
        'hover:bg-blue-100',
        'rounded-lg',
        'transition',
        'cursor-pointer'
      )}
    >
      <Avatar user={profile} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <UserBox data={user} />
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(
              'truncate',
              'text-sm',
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConversationBox
