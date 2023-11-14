import AuthRedirecter from "@/components/providers/AuthRedirector"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const page = async() => {
        const session = await getServerSession(authOptions)
        console.log(session)

        if(session?.user){
            return (
              <h2 className="flex justify-center items-center h-screen">
                Welcome back - {session.user.username}
              </h2>
            )
        }

  return (    
    <AuthRedirecter/>
    
  )
}
export default page