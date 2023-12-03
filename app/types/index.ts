import { Conversation, Message, Prisma, Profile, User } from '@prisma/client'

export type FullMessageType = Message & {
  sender: User
  seen: User
}


export type FullConversationType = Conversation & {
  users: User[]
  messages: FullMessageType[]
}

type ConversationParticipant = {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ConversationType = {
  id: string;
  createdAt: Date;
  lastMessageAt: Date;
  name: string | null;
  updatedAt: Date;
  participants: ConversationParticipant[];
};
