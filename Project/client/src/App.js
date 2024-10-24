import React, { useState, useEffect } from 'react'
import Navbar from "./Navbar.js"
import LandingPageTop from './LandingPageTop.js'
import Card from "./card.js"
import data from "./data.js"
import Chatbox from './Chatbox';

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
      <div className="chat-container">
        <h2 className="chat-title">Ask me anything VCT related</h2>
        <Chatbox />
      </div>



    </div>
    )
}

export default App