import SignUpForm from "@/components/form/signupform"
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
  return (
    <div className="flex overflow-hidden">
      <Image
        src={'/signup.png'}
        width={560}
        height={10}
        alt="signin"
        className="h-screen hidden lg:block"
      ></Image>
      <div className="md:ml-10 ml-2 mt-5 overflow-y-hidden h-screen">
        <Link href="/" className="font-extrabold text-2xl">
          Skill<br></br> Exchange
        </Link>
        <div className="flex flex-col justify-center items-center w-96 rounded-2xl h-5/6 p-16 -pt-4 bg-[#D2E9F6] md:ml-28 md:mr-0 mr-4 ml-4 shadow-md">
          <div className="font-bold text-xl">Sign in</div>
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}
export default page