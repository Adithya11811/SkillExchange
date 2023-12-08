import EmptyState from "@/components/rooms/EmptyState"
import getUsersInSameRoom from "@/lib/actions/getUsers"
import UserList from "./UserList"

const People =async () => {
  const users = await getUsersInSameRoom()
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <UserList items={users} />
      <EmptyState />
    </div>
  )
}

export default People
