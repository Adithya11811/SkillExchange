import { db } from '../db'
import getCurrentUser from './getCurrentUser'
import { FullConversationType } from '@/app/types'

const getConversations = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser?.id) {
    return []
  }

  try {
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        participants: {
          some: {
            id: currentUser.id,
          },
        },
      },
      include: {
        participants: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    })

    // Map the conversations to FullConversationType
    const mappedConversations = conversations.map(
      (conversation) => {
        return {
          ...conversation,
          users: conversation.participants,
        }
      }
    )

    return mappedConversations
  } catch (error: any) {
    console.error('Error fetching conversations:', error)
    return []
  }
}

export default getConversations
