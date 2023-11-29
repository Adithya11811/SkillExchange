'use client'
import { useRouter } from 'next/navigation'

const AuthRedirecter = () => {
  const router = useRouter()
  router.refresh()
  router.push('/profile')

  return null
}
export default AuthRedirecter
