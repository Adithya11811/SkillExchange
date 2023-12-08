import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


interface PostsProps {
  posts: PostsArray[]
}

type PostsArray = {
  id: number
  user: {
    username: string
    profile: {
      profilePhoto: string
    }
  }
  skillName: string
  description: string
  createdAt: Date
}

const Posts = ({ posts }: PostsProps) => {
  console.log(typeof posts)
  const router = useRouter()
  if (!posts || posts.length === 0) {
    return <p>No requests available.</p>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mx-20 my-14">
      {posts.map((post) => (
        <div
          key={post.id}
          className="relative overflow-hidden transition-transform transform bg-[#D2E9F6] p-4 rounded-xl border-[1px] border-zinc-600 hover:scale-102 hover:shadow-lg hover:bg-[#c0e8ff] "
        >
          {/* Left Side: User Image and Name */}
          <div className="flex items-center mb-4">
            <Avatar>
              <AvatarImage src={post.user.profile.profilePhoto || ''} className='object-contain bg-zinc-300'/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex flex-col">
              <Link
                className="text-lg font-semibold hover:underline"
                href={`/user/${post.user.username}`}
              >
                {post.user.username}
              </Link>
              <span className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Right Side: Skill Name, Skill Description, and Created At */}
          <div className="flex flex-col gap-2">
            <span className="text-md font-semibold">{post.skillName}</span>
            <span className="text-sm font-light">{post.description}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Posts
