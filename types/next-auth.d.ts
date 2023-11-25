import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface User {
        id: int, 
        username: string
    }
  interface Session {
    user: User & {
      id: int
      username: string
    }
    token: {
      id: int
      username: string
    }
  }
}
