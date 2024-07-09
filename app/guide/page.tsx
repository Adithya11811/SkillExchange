'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const Page = () => {
  const images = ['/connectimg.png', '/searchimg.png', '/vidimg.png']
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment index and loop back to the beginning if it exceeds the array length
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 6000)

    return () => clearInterval(interval) // Cleanup on component unmount
  }, [currentIndex, images.length])

  return (
    <>
      <div className="flex justify-center z-0 h-screen items-center mx-16">
        <div className="w-1/2 z-0 h-full flex justify-center items-center inset-0 relative">
          {images.map((imgSrc, index) => (
            <Image
              key={index}
              src={imgSrc}
              alt="video call"
              width={527} // Adjusted width to 400 (or your preferred value)
              height={481} // Keep the original height
              className={`w-1/2 h-4/5 ${
                index === currentIndex
                  ? 'transition-opacity opacity-100 scale-100 z-3 fixed'
                  : 'transition-opacity opacity-0 scale-75 hidden'
              }`}
            />
          ))}
        </div>
        <div className="w-1/2 z-20 h-full inset-0"></div>
      </div>
    </>
  )
}

export default Page
