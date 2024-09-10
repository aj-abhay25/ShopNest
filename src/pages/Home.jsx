import React from 'react'
import Hero from '../components/Hero'
import Shop from '../components/Shop'
import Offer from '../components/Offer'


const Home = () => {
  return (
    <div>
      {/* hero section */}
      <Hero />
      {/* shop section */}
      <div>
        <Shop />
      {/* offer section */}
        <Offer />
      </div>
    </div>
  )
}

export default Home