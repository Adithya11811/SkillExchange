import { db } from '@/lib/db'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

export async function GET(req: NextApiRequest) {
  try {
    // Extract the 'query' query parameter directly using URLSearchParams
    const url = new URL(req.url || '') // Provide a fallback empty string if req.url is undefined
    const {searchParams}  = url

    if (!searchParams) {
      return NextResponse.json(
        { message: 'Invalid request. Query parameters are missing.' },
        { status: 400 }
      )
    }

    const query = searchParams.get('q')

    // Check if query is undefined or empty
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        {
          message:
            'Invalid request. Query parameter "query" is missing or invalid.',
        },
        { status: 400 }
      )
    }

    const requestsWithUserInfo = await db.request.findMany({
      where: {
        OR: [
          {
            skillName: {
              contains: query,
            },
          },
          {
            user: {
              username: {
                contains: query,
              },
            },
          },
        ],
      },
      select: {
        skillName: true,
        description: true,
        createdAt: true,
        id: true,
        user: {
          select: {
            username: true,
            profile: {
              select: {
                profilePhoto: true,
              },
            },
          },
        },
      },
    })
    console.log(requestsWithUserInfo)
    return NextResponse.json(
      { message: 'Success', data: { requestsWithUserInfo } },
      { status: 200 }
    )
  } catch (e) {
    console.error('Error:', e)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
