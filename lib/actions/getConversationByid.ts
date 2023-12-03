import getCurrentUser from './getCurrentUser'
import { db } from '../db'
import { Conversation, User } from '@prisma/client' // Replace with the actual paths
import { ConversationType } from '@/app/types'

const getConversationById = async (
  conversationId: string
): Promise<(ConversationType) | null> => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.email) {
      // You might want to throw an error here to signal the calling code that there's no valid user.
      throw new Error('User not authenticated')
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        participants: true,
      },
    })

    // Assuming Conversations and User are defined as types
    return conversation as (ConversationType) | null
  } catch (error) {
    console.error('Error fetching conversation by ID:', error)

    // You might want to throw an error here to signal the calling code that something went wrong.
    return null
  }
}

export default getConversationById
