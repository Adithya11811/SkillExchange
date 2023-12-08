import NavigationSidebar from '@/components/sidebars/navigationSidebar'
import getUsersInSameRoom from '@/lib/actions/getUsers'
import UserList from './rooms/UserList'
import getConversations from '@/lib/actions/getConversation'
import ConversationList from './conversation/conversationList'
import { FullConversationType, FullMessageType } from '../types'
import { db } from '@/lib/db'

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const users = await getUsersInSameRoom()
  const conversations = await getConversations()

  // Fetch profiles for each user
  const profiles = await Promise.all(
    users.map(async (user) => {
      const profile = await db.profile.findFirst({
        where: {
          userId: user.id,
        },
      })
      return profile ?? null // Use null instead of an empty object if profile is null
    })
  )
    const validProfiles = profiles.filter((profile) => profile !== null) as {
      id: number
      RealName: string
      profilePhoto: string
      birthdate: string
      contacts: string
      Bio: string
      userId: number
      createdAt: Date
      updatedAt: Date
    }[]

  return (
    <NavigationSidebar>
      <div className="h-full">
        <ConversationList
          users={users}
          profiles={validProfiles}
          title="Messages"
          initialItems={conversations}
        />
        {/* <UserList items={users} /> */}
        {children}
      </div>
    </NavigationSidebar>
  )
}
