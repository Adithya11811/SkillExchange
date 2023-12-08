// connectionUtils.ts
import axios from 'axios'

export const createRoom = async (user2Id: number, user1Id: number) => {
  console.log(user1Id)
  console.log(user2Id)

  // First fetch call
  const response = await fetch('/api/rooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user1Id: user1Id,
      user2Id: user2Id,
    }),
  })

  if (response.ok) {
    // Second fetch call using axios
    try {
      const axiosResponse = await axios.post('/api/conversations', {
        userId: user2Id,
      })
      if(!axiosResponse){
          console.log("why god why")
      }
      window.location.reload()
      // Optionally, you can use the axios response data here if needed
    } catch (error) {
      console.error('Axios request failed:', error)
    }
  } else {
    console.error('Registration failed')
  }
}
