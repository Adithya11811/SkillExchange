
import ProfileRedirecter from '@/components/providers/profileRedirector'
import Footer from '@/components/ui/footer'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import UknwUserDetail from './UknwUserDet'
import PnfRedirecter from '@/components/providers/404Redirector'
import UknwSkillDetail from './UknwSkillDet'

function capitalize(s:string) {
  return s[0].toUpperCase() + s.slice(1)
}

export default async function Page({
  params,
}: {
  params: { username: string }
}) {
  const server = await getServerSession(authOptions)
  console.log(server?.user.username)
  console.log(capitalize(params.username))
  
  if (server?.user.username === capitalize(params.username)) {
    return <ProfileRedirecter />
  }
  const userdet = await db.user.findFirst({
    where: {
      username: params.username,
    },
    select: {
      id: true,
    },
  })
  console.log(typeof userdet)
  if (userdet) {
    return (
      <>
        <div className="flex flex-row justify-center items-center h-screen w-full">
          <UknwUserDetail userdet={userdet} />
        </div>
        <h2 className="text-2xl font-bold mt-20 text-center mb-4">
          {' '}
          My Skills
        </h2>
        <UknwSkillDetail userdet={userdet} />
        <Footer />
      </>
    )
  }else{
    return <PnfRedirecter/>
  }
}
