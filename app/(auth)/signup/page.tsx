import SignUpForm from "@/components/form/signupform"

const page = () => {
  return (
    <div className="mt-12 flex flex-col justify-center items-center w-96 rounded-2xl h-5/6 p-12 bg-slate-200">
      <div className=" font-bold text-xl">Sign Up</div>
      <SignUpForm/>
    </div>
  )
}
export default page