import DesktopSidebar from "./DesktopSidebar"
import MobileFooter from "./MobileFooter"
import getProfile from "@/lib/actions/getProfile"

async function NavigationSidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getProfile()

  return (
    <div className="h-full">
      <DesktopSidebar UserProfile={currentUser!}/>
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  )
}
export default NavigationSidebar