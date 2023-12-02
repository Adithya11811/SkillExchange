import AuthRedirecter from '../providers/AuthRedirector'
import { checkProfile } from '../providers/profileChecker'
import SkillCard from './SkillCard'

const SkillDetail: React.FC = async () => {
  const profile = await checkProfile()
  console.log(profile)

  if (profile === undefined || profile === null) {
    // Handle loading state
    return <AuthRedirecter />
  } else {
    // Render user details if the profile exists
    return (

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-32">
        {profile.skills.map((skill, index) => (
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
}

export default SkillDetail

// interface UserProfile {
//   id: number
//   RealName: string
//   profilePhoto: string
//   birthdate: string
//   contacts: string
//   Bio: string
//   userId: number
//   createdAt: Date
//   updatedAt: Date
//   // Add more fields as needed
// }

// <h2>{Profile.RealName}</h2>
// <p>Contacts: {Profile.contacts}</p>
