'use client';
import { CheckCheck, HeartHandshake } from 'lucide-react'
import { Button } from '../ui/button'
import { createRoom } from './ConnectionUtils';

interface ConnectionButtonProps {
  flag: boolean
  user1id: number
  user2id: number
}

const ConnectionButton: React.FC<ConnectionButtonProps> = ({
  flag,
  user1id,
  user2id,
}) => {
  console.log(user1id)
  console.log(user2id)
  const handleClick = async () => {
    if (flag === true) {
      alert('You are already connected with this person!')
    } else {
      await createRoom(user1id, user2id)
    }
  }
  return (
    <Button
      className="z-30 w-[120px] justify-center items-center flex mx-10 my-1 hover:bg-slate-400 bg-blue-400"
      onClick={handleClick}
    >
      {flag ? (
        <>
          Connected <CheckCheck className="-mr-4 ml-2" />
        </>
      ) : (
        <>
          Connect <HeartHandshake className="-mr-4 ml-2" />
        </>
      )}
    </Button>
  )
}

export default ConnectionButton
