'use client'
import { useRouter } from 'next/navigation'

const PnfRedirecter = () => {
  const router = useRouter()
  router.refresh()
  router.push('/404')

  return null
}
export default PnfRedirecter
