'use client';
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AiOutlineArrowRight } from 'react-icons/ai'

const Hero = () => {
  return (
    <div className="flex sm:justify-between justify-center z-0 items-center">
      <div className="lg:mx-32 mx-6 md:mx-8 sm:mx-8 text-[#324B59] h-screen">
        <div className=' my-56'>
          <h1 className="text-5xl  font-extrabold">Welcome</h1>
          <p className="text-xl font-medium my-2 py-4 px-2">
            Expand your knowledge
            <br /> and skills with our <br />
            community
          </p>
          <Button
            variant="default"
            className="my-2 bg-[#394957] text-[#E6F4FF] hover:text-[#2B3640]  hover:bg-[#d7eafbd1] shadow-xl shadow-[#00000025] text-lg font-bold py-6 mx-1 rounded-3xl"
          >
            <Link className="flex items-center justify-center " href="/signin">
              <div className="flex justify-between my-1 mx-2">
                GET STARTED
                <div className="my-1 mx-2 text-2xl">
                  <AiOutlineArrowRight />
                </div>
              </div>
            </Link>
          </Button>
        </div>
      </div>
      <div className="hidden sm:block mr-20">
        <Image
          src={'/working.png'}
          alt="Logo"
          width={500}
          height={680}
          className=" w-42 object-contain h-screen"
        />
      </div>
    </div>
  )
}
export default Hero
