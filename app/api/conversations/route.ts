import getCurrentUser from '@/lib/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { userId } = body

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 400 })
    }

    const existingConversations = await db.conversation.findMany({
      where: {
        AND: [
          { participants: { some: { id: currentUser.id } } },
          { participants: { some: { id: userId } } },
        ],
      },
    })

    const singleConversation = existingConversations[0]

    if (singleConversation) {
      return NextResponse.json(singleConversation)
    }

    const newConversation = await db.conversation.create({
      data: {
        participants: {
          connect: [{ id: currentUser.id }, { id: userId }],
        },
      },
      include: {
        participants: true,
      },
    })

    // // Update all connections with new conversation
    // newConversation.participants.forEach((participant) => {
    //   if (participant.email) {
    //     // pusherServer.trigger(participant.email, 'conversation:new', newConversation)
    //     // Uncomment the line above if you have pusherServer defined and need this functionality
    //   }
    // })

    return NextResponse.json(newConversation)
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
