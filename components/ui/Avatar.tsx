'use client';

import { Profile } from "@prisma/client";

// import useActiveList from "../hooks/useActiveList";
import Image from "next/image";

interface AvatarProps {
  user?: Profile;
};

const Avatar: React.FC<AvatarProps> = ({ user }) => {
//   const { members } = useActiveList();
//   const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div className="
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-9 
        w-9 
        md:h-11 
        md:w-11
      ">
        <Image
          fill
          src={user?.profilePhoto || '/images/placeholder.jpg'}
          alt="Avatar"
          className="object-contain bg-slate-300"
        />
      </div>
      {/* {isActive ? ( */}
        <span 
          className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          " 
        />
      {/* ) : null} */}
    </div>
  );
}

export default Avatar;