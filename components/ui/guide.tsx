import { staggerChildren } from "@/lib/animation"
import InstaCards from "./instcards"
import { motion } from "framer-motion" 


const Guide = () => {
    const cards = [
      {
        imageUrl: 'browsing.png',
        title: 'Browse Skills and Requests',
        description: `Browse skills offered by users in the 'Explore Skills' section and view skill requests in 'Skill Requests.' Find skills you want to learn.`,
      },
      {
        imageUrl: 'talents.png',
        title: 'Talent Exchange',
        description: `After your skill request is accepted, you'll access a dedicated interface for easy communication with your exchange partner.`,
      },
      {
        imageUrl: 'vc.png',
        title: 'Transfer',
        description: `Use our messaging system to plan and coordinate, and enjoy real-time learning through video calls`,
      },
    ]
  return (
    <div className="mt-16">
      <motion.div className="text-5xl text-center font-bold" variants={staggerChildren}>Quick Guide</motion.div>
      <InstaCards cards={cards}/>
    </div>
  )
}
export default Guide