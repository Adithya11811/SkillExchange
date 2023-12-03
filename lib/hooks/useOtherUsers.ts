import { User } from '@prisma/client'
import { ConversationType } from '@/app/types'

const useOtherUser = (
  conversation: ConversationType,
  user: User | null
): User | null => {
  const otherUser = conversation.participants.find(
    (participant) => participant.email !== user?.email
  )

  return otherUser || null
}

export default useOtherUser
