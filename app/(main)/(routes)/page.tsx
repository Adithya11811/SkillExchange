'use client'
import About from "@/components/ui/about"
import Footer from "@/components/ui/footer"
import Guide from "@/components/ui/guide"
import Hero from "@/components/ui/hero"
import Navbar from "@/components/ui/navbar"


const Page = () => {
  return (
    <div>
      <Navbar />
      <div className="w-32 h-32 fixed my-96 z-100 spots"></div>
      <div className="w-32 h-32 fixed  mx-24 md:mx-96 my-80 z-100 spots"></div>
      <Hero />
      <Guide />
      <About />
      <Footer/>
    </div>
  )
}

export default Page
