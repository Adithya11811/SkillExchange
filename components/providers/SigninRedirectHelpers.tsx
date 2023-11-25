'use client'
import { useRouter } from 'next/navigation'

const SigninRedirectHelper = () => {
  const router = useRouter()
  router.refresh()
  router.push('/signin')

  return null
}
export default SigninRedirectHelper
