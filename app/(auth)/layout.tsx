import Navbar from "@/components/ui/navbar";
import { FC,ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({children}) => {
  return (
    <>
      <Navbar/>
      <div className="h-screen flex flex-col justify-center items-center">
        {children}
      </div>
    </>
  )
}
export default AuthLayout