import AuthRedirecter from '../providers/AuthRedirector'
import { checkProfile } from '../providers/profileChecker'

const UserDetail: React.FC = async () => {
  const Profile = await checkProfile()
  console.log(Profile)

  if (Profile === undefined || Profile === null) {
    // Handle loading state
    return <AuthRedirecter/>
  } else {
    // Render user details if the profile exists
    return (
      <div>
        {/* left user details */}
        <div>
          <h2>{Profile.RealName}</h2>
          <p>Contacts: {Profile.contacts}</p>
          {/* Add more user details as needed */}
        </div>
        {/* right skill details */}
        <div>{/* Add skill details or any other information */}</div>
      </div>
    )
  }
}


export default UserDetail


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