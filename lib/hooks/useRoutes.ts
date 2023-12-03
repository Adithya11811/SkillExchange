import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2'
import { signOut } from 'next-auth/react'
import useConversation from './useConversation'
import { FaClipboardList, FaRegHandshake } from 'react-icons/fa'

const useRoutes = () => {
  const pathname = usePathname()
  const { conversationId } = useConversation()

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/rooms',
        icon: HiChat,
        active: pathname === '/rooms' || !!conversationId,
      },
      {
        label: 'Listings',
        href: '/listings',
        icon: FaClipboardList,
        active: pathname === '/listings',
      },
      {
        label: 'requests',
        href: '/requests',
        icon: FaRegHandshake,
        active: pathname === '/requests',
      },
      {
        label: 'Logout',
        onClick: () => signOut(),
        href: '#',
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId]
  )

  return routes
}

export default useRoutes
