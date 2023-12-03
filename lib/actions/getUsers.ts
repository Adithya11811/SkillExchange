import { db } from '../db'
import getCurrentUser from './getCurrentUser'


const getUsersInSameRoom = async () => {
  const user = await getCurrentUser()

  if (!user?.id) {
    return []
  }

  try {
    const usersInSameRoom = await db.rooms
      .findMany({
        where: {
          OR: [{ participant1id: user.id }, { participant2id: user.id }],
        },
        include: {
          participant1: true,
          participant2: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      .then((rooms) => {
        // Extracting participants from the rooms
        const participants = rooms.flatMap((room) => [
          room.participant1,
          room.participant2,
        ])

        // Filter out the current user
        const usersInSameRoom = participants.filter(
          (participant) => participant.id !== user.id
        )

        return usersInSameRoom
      })

    return usersInSameRoom
  } catch (error) {
    console.error('Error fetching users in the same room:', error)
    throw error
  }
}

export default getUsersInSameRoom
