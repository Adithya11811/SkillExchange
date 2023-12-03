import NavigationSidebar from '@/components/sidebars/navigationSidebar'
import getUsersInSameRoom from '@/lib/actions/getUsers'
import UserList from './rooms/UserList'
import getConversations from '@/lib/actions/getConversation'
import ConversationList from './conversation/conversationList'
import { FullConversationType, FullMessageType } from '../types'

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const users = await getUsersInSameRoom()
  const conversations = await getConversations()

  return (
    <NavigationSidebar>
      <div className="h-full">
        <ConversationList users={users} title="Messages" initialItems={conversations} />
        {/* <UserList items={users} /> */}
        {children}
      </div>
    </NavigationSidebar>
  )
}
