import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { redirect } from 'next/navigation'
import Loading from '@/components/ui/loader'

interface Quote {
  quote: string
  author: string
  category: string
}

const fetchData = async (category: string): Promise<Quote[] | undefined> => {
  try {
    const response: AxiosResponse<Quote[]> = await axios.get(
      `https://api.api-ninjas.com/v1/quotes?category=${category}`,
      {
        headers: {
          'X-Api-Key': 'tjSmbTNu/tz+mbI0ikRdVA==3fo9i1dE2ik1qT0D',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Request failed:', error)
  }
}

const Loadinghelp = async () => {
  const category = 'inspirational'

  const data = await fetchData(category)
  if (!data) {
    redirect('/')
  }

  const ans = data[0]
  console.log(typeof ans)
  const quote = [ans.author, ans.quote]
  return <Loading quote={quote}></Loading>
}

export default Loadinghelp
