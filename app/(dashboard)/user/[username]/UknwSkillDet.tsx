// UknwUserDetail.tsx
import SkillCard from '@/components/dashboardui/SkillCard'
import { db } from '@/lib/db'
import React from 'react'

interface UknwUserDetailProps {
  userdet: { id: number } // Update the type based on your actual userdet structure
}

const UknwSkillDetail: React.FC<UknwUserDetailProps> = async ({ userdet }) => {
  if (!userdet) {
    return <p>User details not available</p>
  }

  const skills = await db.skill.findMany({
    where: {
      userId: userdet.id,
    },
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-32">
      {skills.map((skill, index) => (
        <SkillCard
          key={index}
          skillName={skill.skillName}
          proficiency={Number(skill.Proficiency)}
          description={skill.description}
        />
      ))}
    </div>
  )
}

export default UknwSkillDetail
