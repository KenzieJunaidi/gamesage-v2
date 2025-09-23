import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import axios, { all } from "axios";
import { Hero } from "./components/Hero";
import { GameBank } from "./components/GameBank";
import { GameDetails } from './GameDetails/GameDetails';
import './App.css'

function App() {

  const [isLoaded, setIsLoaded] = useState(false);

  // Searching Mechanism
  const [searchInput, setSearchInput] = useState("");

  // Card Click Mechanism
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    setIsLoaded(false);
    setIsLoaded(true);
  })

  const handleCardClick = (game) => {
    setSelectedGame(game);
  }

  const handleCardClose = () => {
    setSelectedGame(null);
  }

  return (
    <div className={`app ${isLoaded ? "loaded" : ""}`}>
      <GameDetails game={selectedGame} setSelectedGame={setSelectedGame}/>
      <Hero searchInput={searchInput} setSearchInput={setSearchInput}/>
      <hr style={{ border: "none", borderTop: "1px solid var(--line-break)" }} />
      <GameBank searchInput={searchInput} setSearchInput={setSearchInput} handleCardClick={handleCardClick}/>
    </div>
  )
}

export default App
