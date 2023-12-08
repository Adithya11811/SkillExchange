import { NextResponse } from 'next/server'
import getCurrentUser from '@/lib/actions/getCurrentUser'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { message, image, conversationId } = body

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Fetch existing messages and sort them by date
    const existingMessages = await db.message.findMany({
      where: {
        conversation: {
          id: conversationId,
        },
      },
      orderBy: {
        createdAt: 'asc', // or 'desc' if you want to sort in descending order
      },
    })

    // Find the correct position to insert the new message
    let insertIndex = existingMessages.findIndex(
      (msg) => msg.createdAt > new Date()
    )

    // If no suitable position is found, insert at the end
    if (insertIndex === -1) {
      insertIndex = existingMessages.length
    }

    // Insert the new message at the correct position
    const newMessage = await db.message.create({
      include: {
        seen: true,
        sender: true,
      },
      data: {
        body: message,
        image: image,
        conversation: {
          connect: { id: conversationId },
        },
        sender: {
          connect: { id: currentUser.id },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
        createdAt: new Date(), // Set the creation date for the new message
      },
    })

    // Insert the new message at the calculated position
    existingMessages.splice(insertIndex, 0, newMessage)

    // Update the conversation with the sorted messages
    const updatedConversation = await db.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          set: existingMessages.map((msg) => ({ id: msg.id })),
        },
      },
      include: {
        participants: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    })

    return NextResponse.json(newMessage)
  } catch (error) {
    console.log(error, 'ERROR_MESSAGES')
    return new NextResponse('Error', { status: 500 })
  }
}
