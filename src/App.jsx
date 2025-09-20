import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import axios, { all } from "axios";
import { Hero } from "./components/Hero";
import { GameBank } from "./components/GameBank";
import './App.css'

function App() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setIsLoaded(false);
    setIsLoaded(true);
  })

  return (
    <div className={`app ${isLoaded ? "loaded" : ""}`}>
      <Hero searchInput={searchInput} setSearchInput={setSearchInput}/>
      <hr style={{ border: "none", borderTop: "1px solid var(--line-break)" }} />
      <GameBank searchInput={searchInput} setSearchInput={setSearchInput}/>
    </div>
  )
}

export default App
