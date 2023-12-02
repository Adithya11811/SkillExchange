import Image from 'next/image'

interface PostsProps {
  posts: PostsArray[]
}

type PostsArray = {
  id: number
  user: {
    username: string
    profiles: {
      profilePhoto: string
    }[]
  }
  skillName: string
  description: string
  createdAt: Date
}

const Posts = ({ posts }: PostsProps) => {
  console.log(typeof(posts))
    if (!posts || posts.length == 0) {
      return <p>No requests available.</p>
    }
    console.log(posts[0].user.profiles[0]?.profilePhoto)
  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex p-3 gap-4 my-6 rounded-xl border-[1px] border-zinc-600 w-3/4"
        >
          {/* Left Side: User Image and Name */}
          <div className="flex flex-col items-center">
            <img
              src={post.user.profiles[0]?.profilePhoto || ''} 
              alt="avatar"
              height={70}
              width={70}
              className='object-cover rounded-xl'
            />
            <div className="ml-3">
              <span className="text-xl font-semibold">
                {post.user.username}
              </span>
            </div>
          </div>

          {/* Right Side: Skill Name, Skill Description, and Created At */}
          <div className="flex flex-col flex-grow gap-2 ">
            <span className="text-lg font-semibold">{post.skillName}</span>
            <span className="text-sm font-light">{post.description}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default Posts
