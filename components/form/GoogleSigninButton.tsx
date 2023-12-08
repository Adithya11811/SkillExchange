import { FC, ReactNode } from 'react'
import { Button } from '../ui/button'

interface GoogleSignInButtonProps {
  children: ReactNode
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () => console.log('login with google')

  return (
    <Button
      onClick={loginWithGoogle}
      className="w-full bg-[#2B3640] hover:bg-[#70bdfc] text-[#b7ccde] hover:text-[#2B3640] hover:border-zinc-950 hover:font-semibold text-base"
    >
      {children}
    </Button>
  )
}

export default GoogleSignInButton
