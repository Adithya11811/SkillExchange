import DashboardNavbar from '@/components/ui/dashboardHeader'
import Navbar from '@/components/ui/navbar'
import { FC, ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <DashboardNavbar />
      <div>
        {children}
      </div>
    </>
  )
}
export default AuthLayout
