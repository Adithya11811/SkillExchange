import AddSkills from '@/components/form/AddingSkills'

const page = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-7/12 h-screen p-12 ">
        <div className=" font-bold text-xl">Add Your Skills</div>
        <AddSkills />
      </div>
    </div>
  )
}
export default page
