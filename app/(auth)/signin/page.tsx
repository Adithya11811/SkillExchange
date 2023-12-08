import Signinform from "@/components/form/signinform"
import Image from "next/image"
import Link from "next/link"


const page = () => {
  return (
    <div className="flex ">
      <Image
        src={'/signin.png'}
        width={560}
        height={10}
        alt="signin"
        className="h-screen hidden lg:block"
      ></Image>
      <div className="md:ml-10 ml-2 mt-5">
        <Link href="/" className="font-extrabold text-2xl">
          Skill<br></br> Exchange
        </Link>
        <div className="flex flex-col justify-center items-center w-96 rounded-2xl h-96 p-20 bg-[#D2E9F6] md:mt-14 md:ml-28 md:mr-0 mr-4 mt-6 ml-4 shadow-md">
          <div className="font-bold text-xl">Sign in</div>
          <Signinform />
        </div>
      </div>
    </div>
  )
}
export default page