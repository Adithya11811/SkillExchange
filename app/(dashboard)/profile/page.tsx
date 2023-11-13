import CreateProfile from '@/components/form/createprofile'

const page = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-96 h-screen p-12 ">
        <div className=" font-bold text-xl">Create a Profile</div>
        <CreateProfile />
      </div>
    </div>
  )
}
export default page
