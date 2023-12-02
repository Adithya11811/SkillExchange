// connectionUtils.ts
export const createRoom = async (user2Id: number, user1Id: number) => {
  console.log(user1Id)
  console.log(user2Id)

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
    window.location.reload()
  } else {
    console.error('Registration failed')
  }
}
