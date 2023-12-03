'use client';

import { FullMessageType } from "@/app/types";
import { User } from "@prisma/client";
import { useRef, useState } from "react";
import MessageBox from "./MessageBox";

interface BodyProps {
  initialMessages: FullMessageType[]
  conversationId: String
  user: User
}


const Body: React.FC<BodyProps> = ({ initialMessages, conversationId, user }) => {
  const [messages, setmessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  const convid = conversationId
  console.log(convid)

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
          user={user}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  )
}

export default Body