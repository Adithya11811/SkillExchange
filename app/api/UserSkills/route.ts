// Import necessary modules
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import * as z from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Prisma } from '@prisma/client'

// Define Schema for input validation
const SkillSchema = z.object({
  SkillName: z.string().min(1, 'Skill Name is required').max(100),
  proficiency: z.string().min(1, 'Photo is required'),
  description: z.string().min(1, '10 words bio is minimum').max(150),
})
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const session = await getServerSession(authOptions)
    console.log('Session:', session)

    const { SkillName, proficiency, description} =
      SkillSchema.parse(body)
    console.log('Parsed body:', {
      SkillName,
      proficiency,
      description,
    })

    const username = session?.user?.username

    if (!username) {
      return NextResponse.json(
        {
          user: null,
          message: 'Unauthorized',
        },
        { status: 401 }
      )
    }

    const profile = await db.skill.create({
      data: {
        skillName: SkillName,
        Proficiency: proficiency,
        description, 
        user: {
          connect: {
            username,
          },
        },
      },
    })
    console.log('Profile created:', profile)

    const { ...rest } = profile

    return NextResponse.json(
      { user: rest, message: 'Profile Created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating profile:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma error details:', error.meta)
    }
    return NextResponse.json(
      { message: 'Something Went Wrong' },
      { status: 500 }
    )
  }
}
