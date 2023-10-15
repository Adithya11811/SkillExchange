'use client'
import Hero from "@/components/ui/hero"

const Page = () => {
  return (
    <div>
      <div className="w-32 h-32 fixed z-100 spots"></div>
      <div className="w-32 h-32 fixed my-96 z-100 spots"></div>
      <div className="w-32 h-32 fixed mx-96 my-80 z-100 spots"></div>
      <Hero />
    </div>
  )
}

export default Page
