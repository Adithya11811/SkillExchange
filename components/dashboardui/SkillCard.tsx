// SkillCard.tsx

import React from 'react'
import { FaStar } from 'react-icons/fa'

interface SkillCardProps {
  skillName: string
  proficiency: number
  description: string
}

const SkillCard: React.FC<SkillCardProps> = ({
  skillName,
  proficiency,
  description,
}) => {
  const renderStars = () => {
    const stars = []
    for (let i = 0; i < proficiency; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />)
    }
    return stars
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{skillName}</h3>
      <div className="flex items-center mb-2">{renderStars()}</div>
      <p className="text-gray-700">{description}</p>
    </div>
  )
}

export default SkillCard
