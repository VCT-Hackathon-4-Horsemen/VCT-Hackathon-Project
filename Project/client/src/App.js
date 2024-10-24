import React, { useState, useEffect } from 'react'
import Navbar from "./Navbar.js"
import LandingPageTop from './LandingPageTop.js'
import Card from "./card.js"
import data from "./data.js"

function App() {

  const cards = data.map(item => {
    return (
        <Card
            key={item.id}
            {...item}
            
        />
    )
  })  



    return (
    <div>
      <Navbar />
      <LandingPageTop />
      <section className="cards-section">
        <h2 className="section-title">Top VCT International Players:</h2>
        <div className="cards-list">
          {cards}
        </div>
      </section>



    </div>
    )
}

export default App