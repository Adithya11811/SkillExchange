import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const page = async() => {
        const session = await getServerSession(authOptions)
        console.log(session)

        if(session?.user){
            return (
              <h2 className="flex justify-center items-center h-screen">
                Wlcome back - {session.user.username}
              </h2>
            )
        }

  return (    
    <div className="flex justify-center items-center h-screen">Login and comeback</div>
  )
}
export default page