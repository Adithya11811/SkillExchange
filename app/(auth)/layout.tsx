import Navbar from "@/components/ui/navbar";
import { Toaster } from "@/components/ui/toaster";
import { FC,ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({children}) => {
  return (
    <>
      {/* <Navbar/> */}
      <div className="h-screen">{children}</div>
      <Toaster />
    </>
  )
}
export default AuthLayout