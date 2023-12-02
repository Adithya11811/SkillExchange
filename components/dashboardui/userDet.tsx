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
      <div className="mt-20 rounded-xl flex  h-4/5 w-4/5 bg-[#D2E9F6] ">
        {/* left user details */}
        <div className="p-10 w-4/5 grid place-content-center shadow-lg h-full">
          <img
            src={Profile.profile.profilePhoto}
            className="object-contain h-96 w-full rounded-2xl"
            alt="profile photo"
          />
          {/* Add more user details as needed */}
        </div>
        {/* right skill details */}
        <div className="w-full p-12">
          {/* Add skill details or any other information */}
          <div className="text-[#484848] w-80 font-bold text-6xl">
            {Profile.profile.RealName}
          </div>
          <div className="mt-6 ml-4 text-[#839DAD] font-semibold text-xl">
            AGE: 26
          </div>
          <div className="ml-4 text-[#839DAD] font-semibold text-xl">
            Contacts: {Profile.profile.contacts}{' '}
          </div>
          <div className="ml-4 mt-6 h-40 w-96 rounded-xl shadow-lg">
            <div className="p-3 text-[#484848] font-bold text-xl">BIO:</div>
            <div className="pl-8 text-[#484848]">{Profile.profile.Bio}</div>
          </div>
        </div>
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

          // <h2>{Profile.RealName}</h2>
          // <p>Contacts: {Profile.contacts}</p>