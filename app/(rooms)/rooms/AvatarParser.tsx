import Avatar from '@/components/sidebars/Avatar'
import { db } from '@/lib/db'
import { User } from '@prisma/client'

interface AvatarProps {
  data: User
}

const AvatarParser: React.FC<AvatarProps> = async ({ data }) => {
  const profile = await db.profile.findFirst({
    where: {
      userId: data.id,
    },
  })

  return <Avatar user={profile!} />
}
export default AvatarParser
