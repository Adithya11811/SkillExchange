import Link from 'next/link'
import { motion } from 'framer-motion'

const Footer: React.FC = () => {
  return (
    <footer className="mt-32 bg-gray-800 text-blue-100 p-5">
      <div className="max-w-7xl mx-20 flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <h2 className="text-2xl font-bold mt-2">Skill Exchange</h2>
          <p className="mt-4">
            The first free end-to-end analytics service for the site, designed
            to work with enterprises of various levels and business segments.
          </p>
          <p className="text-blue-200">More about us</p>
          <p className="mt-4">
            &copy; 2023 SkillExchange. All rights reserved.
          </p>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 mt-8 md:mt-0">
          <ul className="flex">
            <li className="mr-2">
              <Link href={'#'}>About</Link>
            </li>
            <li className="mr-2">
              <Link href={'#'}>Testimonials</Link>
            </li>
            <li className="mr-2">
              <Link href={'#'}>Contacts</Link>
            </li>
            <li className="mr-2">
              <Link href={'#'}>Pricing</Link>
            </li>
          </ul>

          <div className="mt-4">
            <p className="mt-2">Contact Us</p>
            <p className="mt-1">+91 6361964223</p>
          </div>
          <div className="mt-6 text-blue-300">
            Made By Adithya Rao K and Amar Y S
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
