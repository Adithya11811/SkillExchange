'use client'
import { useRouter } from 'next/navigation'

 const RedirectHelper = () => {
    const router = useRouter();
    router.refresh()
    router.push('/admin')
    
  return null
}
export default RedirectHelper
