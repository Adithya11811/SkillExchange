import getConversationById from '@/lib/actions/getConversationByid'
import getMessages from '@/lib/actions/getMessages' 

// import Header from './components/Header'
import EmptyState from '@/components/rooms/EmptyState'
import Header from './components/Header'
import getCurrentUser from '@/lib/actions/getCurrentUser'
import Body from './components/Body'
import Form from './components/Form'
// import Body from './components/Body'
// import Form from './components/Form'
// import EmptyState from '@/app/components/EmptyState'


const ChatId = async ({ params }: { params: {conversationid: string} }) => {

  const conversation = await getConversationById(params.conversationid)
  const messages = await getMessages(params.conversationid)
  const user = await getCurrentUser()
  const hello = params.conversationid
  console.log('ooiiiii', typeof(hello))
  if(!user){
    return null
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

//   return (
//     <div className="lg:pl-80 h-full">
//       <div className="h-full flex flex-col">
//         <Header conversation={conversation} />
//         <Body initialMessages={messages} />
//         <Form />
//       </div>
//     </div>
//   )
return (
  <div className="lg:pl-80 h-full">
    <div className="h-screen flex flex-col">
      <Header conversation={conversation} user={user} />
      <Body initialMessages={messages} conversationId={params.conversationid} user={user}/>
      <Form conversationId={params.conversationid} />
    </div>
  </div>
)
}

export default ChatId
