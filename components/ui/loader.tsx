import Image from 'next/image'

type AuthorQuoteArray = [author: string, quote: string]

interface QuoteProps {
  quote:  AuthorQuoteArray
}

const Loading: React.FC<QuoteProps> = ({ quote }) => {
  const [author, quoteText] = quote

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen place-content-center">
        <Image
          src="/duck.gif"
          alt="A gif"
          width={150}
          height={100}
          className="rounded-full shadow-xl grid place-content-center"
        />
        <div className="mt-6 font-semibold text-xl">Motivational Quote</div>
        {quote ? (
          <>
            <div className="font-medium text-lg mt-2">
              `&quot;`{quoteText}`&quot;`
            </div>
            <div className="text-sm mt-1">{author}</div>
          </>
        ) : (
          <div className="font-medium text-lg mt-2">Loading</div>
        )}
      </div>
    </>
  )
}

export default Loading
