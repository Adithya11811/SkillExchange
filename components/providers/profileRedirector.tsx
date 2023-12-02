'use client'
import { useRouter } from 'next/navigation'

const ProfileRedirecter = () => {
  const router = useRouter()
  router.refresh()
  router.push('/admin')

  return null
}
export default ProfileRedirecter
