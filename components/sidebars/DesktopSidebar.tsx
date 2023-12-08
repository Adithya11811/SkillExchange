'use client'

import useRoutes from '@/lib/hooks/useRoutes'
import DesktopItem from './DesktopItem'
// import SettingsModal from './SettingsModal'
import { useState } from 'react'
import { Profile } from '@prisma/client'
import Avatar from './Avatar'
import Router, { useRouter } from 'next/navigation'

interface DesktopSidebarProps {
  UserProfile: Profile
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ UserProfile }) => {
  const routes = useRoutes()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  console.log({ UserProfile }, 'TEST')

  return (
    <>
      {/* <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      /> */}
      <div
        className="
        hidden 
        lg:fixed 
        lg:inset-y-0 
        lg:left-0 
        lg:z-40 
        lg:w-20 
        xl:px-6
        lg:overflow-y-auto 
        lg:bg-white 
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
      "
      >
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => router.push('/admin')}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={UserProfile} />
          </div>
        </nav>
      </div>
    </>
  )
}

export default DesktopSidebar
