import './SearchBar.css';
import { useState, useEffect } from 'react';
import axios, { all } from 'axios';

export const SearchBar = () => {
    
    const [query, setQuery] = useState("");
    const [allGames, setAllGames] = useState([]);
    const [isAvailable, setIsAvailable] = useState(false); // Invis State

    useEffect(() => {
        axios({
            method: 'GET',
            url: "/steam_games.json",
        }).then(res => {
            let games = Object.values(res.data);
            setAllGames(games)
        })

    }, [])

    useEffect(() => {
        const value = query.toLowerCase();

        if(value.length === 0){
            setIsAvailable(false);
            return
        }

        const filtered = allGames.filter(game => game.name.toLowerCase().startsWith(value)).sort((a, b) => b.review_count - a.review_count).slice(0, 5);

        if(filtered.length > 0){
            setIsAvailable(true);
        }

        console.log(filtered);

    }, [query])

    const handleChange = (e) => {
        setQuery(e.target.value);
        console.log(query);
    }

    return (
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="search-container">
                <input type="text" placeholder="Find your game. . ." className="searchbar" autoComplete="off" onChange={handleChange}/>
                <button className="search-button">
                    <i className="fa-solid fa-magnifying-glass search-icon" />
                </button>
            </div>
            <div className="suggestion-box">

            </div>
        </div>
    );
}