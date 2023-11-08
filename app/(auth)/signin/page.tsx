import Signinform from "@/components/form/signinform"

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center w-96 rounded-2xl h-96 p-20 bg-slate-200">
        <div className=" font-bold text-xl">Sign in</div>
      <Signinform />
    </div>
  )
}
export default page