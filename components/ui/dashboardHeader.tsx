'use client';
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { BiMenuAltRight, BiX } from 'react-icons/bi'
import { Button } from './button'
import { signOut } from 'next-auth/react';

type Link = {
  label: string
  url: string
}

const DashboardNavbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true)
      } else {
        setScrolling(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive)
  }

  return (
    <div
      className={`fixed w-screen z-50 bg-transparent bg-blend-saturation transition-colors ${
        scrolling ? 'bg-custom-color' : 'bg-transparent'
      }`}
    >
      <div className="w-32 h-32 fixed z-100 spots"></div>
      <div className="mx-4 my-2 flex flex-col  py-4 text-xl font-bold text-[#324B59] sm:mx-8 lg:mx-32">
        <div className="flex justify-between">
          <Link
            href="/admin"
            className="flex items-center justify-center font-extrabold text-2xl"
          >
            Skill<br></br> Exchange
          </Link>
          <div className="hidden space-x-10 lg:flex">
            <Link className="flex items-center" href="/listings">
              Listings
            </Link>
            <Link className="flex items-center" href="/request">
              Request
            </Link>
            <Link className="flex items-center" href="/contact">
              Rooms
            </Link>
            <Link className="flex items-center" href="/contact">
              Notification
            </Link>
            <Button
              variant="default"
              onClick={() => signOut({
                redirect:true,
                callbackUrl: `${window.location.origin}/signin`
              })}
              className="my-3 bg-[#E6F4FF] text-[#2B3640]  hover:text-[#E6F4FF] hover:bg-[#2B3640] shadow-xl text-lg font-bold flex items-center justify-center"
            >
                Sign Out
            </Button>
          </div>
          <div
            className="flex items-center text-2xl lg:hidden"
            onClick={toggleMenu}
          >
            {!isMenuActive ? <BiMenuAltRight /> : <BiX />}
          </div>
        </div>
        {isMenuActive && <MobileNav />}
      </div>
    </div>
  )
}

const MobileNav = () => {
  return (
    <div className="z-200 mt-4 w-screen h-screen">
      <div className="flex flex-col space-y-3 py-5 md:hidden">
        <Link className="flex items-center" href="#">
          Listings
        </Link>
        <Link className="flex items-center" href="#">
          Request
        </Link>
        <Link className="flex items-center" href="#">
          Rooms
        </Link>
        <Link className="flex items-center" href="#">
          Notifications
        </Link>
        <Link className="flex items-center" href="#">
          Log out
        </Link>
      </div>
    </div>
  )
}

export default DashboardNavbar
