import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import * as z from 'zod'

const RoomSchema = z.object({
  user1Id: z.number(),
  user2Id: z.number(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { user1Id, user2Id } = RoomSchema.parse(body)

    // Ensure that user2Id is provided
    if (user2Id === undefined) {
      return NextResponse.json(
        { message: 'user2Id is required' },
        { status: 400 }
      )
    }

    console.log('User IDs:', user1Id, user2Id)

    const participant1 = await db.user.findUnique({
      where: { id: user1Id },
    })

    const participant2 = await db.user.findUnique({
      where: { id: user2Id },
    })

    if (!participant1 || !participant2) {
      console.error(
        'Invalid participants. Participant1:',
        participant1,
        'Participant2:',
        participant2
      )
      return NextResponse.json(
        { message: 'Invalid participants' },
        { status: 400 }
      )
    }

    const room = await db.rooms.create({
      data: {
        participant1: { connect: { id: user1Id } },
        participant2: { connect: { id: user2Id } },
      },
    })

    console.log('Room created:', room)

    const { ...rest } = room

    return NextResponse.json(
      { room: rest, message: 'Room Created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating room:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma error details:', error.meta)
    }
    return NextResponse.json(
      { message: 'Something Went Wrong' },
      { status: 500 }
    )
  }
}
