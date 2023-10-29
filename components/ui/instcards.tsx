import React from 'react'

interface CardProps {
  imageUrl: string
  title: string
  description: string
}

const Card: React.FC<CardProps> = ({ imageUrl, title, description }) => {
  return (
    <div className="mt-6 mx-10 bg-transparent">
      <img
        src={imageUrl}
        alt="Card Image"
        className="w-full h-44 object-contain rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl  text-center font-extrabold mb-2">{title}</h2>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </div>
  )
}

interface CardListProps {
  cards: CardProps[]
}

const InstaCards: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div className="flex my-8 items-center justify-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Card
            key={index}
            imageUrl={card.imageUrl}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  )
}

export default InstaCards


