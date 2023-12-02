import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const NavigationSidebar = async() => {
    const user = await getServerSession(authOptions)
    if(!user){
        redirect('/signin')
    }
    
  return (
    <div>navigationSidebar</div>
  )
}
export default NavigationSidebar