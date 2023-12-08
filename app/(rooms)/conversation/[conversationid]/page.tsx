import getConversationById from '@/lib/actions/getConversationByid'
import getMessages from '@/lib/actions/getMessages'
import EmptyState from '@/components/rooms/EmptyState'
import Header from './components/Header'
import getCurrentUser from '@/lib/actions/getCurrentUser'
import Body from './components/Body'
import Form from './components/Form'
import { db } from '@/lib/db'
import { Profile } from '@prisma/client'
import ConversationList from '../conversationList'

const ChatId = async ({ params }: { params: { conversationid: string } }) => {
  const conversation = await getConversationById(params.conversationid)
  const messages = await getMessages(params.conversationid)
  const user = await getCurrentUser()
  let profile: Profile | null = null // Replace YourProfileType with the actual type of your profile

  const hello = params.conversationid
  console.log('ooiiiii', typeof hello)
  if (!user) {
    return null
  }

  if (conversation) {
    if (conversation.participants[0].id === user.id) {
      profile = await db.profile.findFirst({
        where: {
          userId: conversation.participants[1].id,
        },
      })
    } else {
      profile = await db.profile.findFirst({
        where: {
          userId: conversation.participants[0].id,
        },
      })
    }
  }


  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className=" flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

const room = await db.rooms.findFirst({
  where: {
    OR: [
      {
        participant1id: conversation.participants[0].id,
        participant2id: conversation.participants[1].id,
      },
      {
        participant1id: conversation.participants[1].id,
        participant2id: conversation.participants[0].id,
      },
    ],
  },
  select: {
    id: true,
  },
})

  if (!room) {
    return (
      <div className="lg:pl-80 h-full">
        <div className=" flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }


   const otherUserName =await db.user.findFirst({
    where:{
      id: profile?.userId 
    },
    select:{
      username:true
    }
   })

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-screen flex flex-col">
        <Header conversation={conversation} user={user} profile={profile!} name={otherUserName?.username!} roomid={room.id}/>
        <Body
          initialMessages={messages}
          conversationId={params.conversationid}
          user={user}
        />
        <Form conversationId={params.conversationid} />
      </div>
    </div>
  )
}

export default ChatId
