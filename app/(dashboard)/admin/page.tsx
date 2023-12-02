import SkillDetail from "@/components/dashboardui/skillDet"
import UserDetail from "@/components/dashboardui/userDet"
import AuthRedirecter from "@/components/providers/AuthRedirector"
import Footer from "@/components/ui/footer"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const page = async() => {
        const session = await getServerSession(authOptions)
        console.log(session)

        if(session?.user){
            return (
              <>
                <div className="flex flex-row justify-center items-center h-screen w-full">
                  <UserDetail />
                </div>
                <h2 className="text-2xl font-bold mt-20 text-center mb-4">
                  {' '}
                  My Skills
                </h2>
                <SkillDetail />
                <Footer/>
              </>
            )
        }

  return (    
    <AuthRedirecter/>

  )
}
export default page