import NavigationSidebar from "@/components/sidebars/navigationSidebar"

const Room = () => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[172px] z-30 flex-col fixed inset-y-0"><NavigationSidebar/></div>
      <div className="md:pl-[172px] h-full">Room</div>
    </div>
  )
}
export default Room