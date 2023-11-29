'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Spinner from './spinner'
import useSWR from 'swr'
import Posts from './posts'

const fetchPosts = async (url: string) => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }

  return response.json()
}

const SearchPage = () => {

  const search = useSearchParams()
  const searchQuery = search ? search.get('q') : null
  const router = useRouter()

  const encodedSearchQuery = encodeURI(searchQuery || '')


  const { data, isLoading } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchPosts,
    { revalidateOnFocus: false },
  )
  if (!encodedSearchQuery) {
    router.push('/')
  }

  if (isLoading) {
    return <Spinner />
  }

  console.log('Data:', data.data.requestsWithUserInfo)

  return (
    <>
      <span className="text-xl">
        Showing results for:{' '}
        <span className="font-semibold">{searchQuery}</span>
      </span>
      <Posts posts={data.data.requestsWithUserInfo} />
    </>
  )
}

export default SearchPage
