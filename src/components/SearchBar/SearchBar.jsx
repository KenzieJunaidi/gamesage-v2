import './SearchBar.css';
import { useState, useEffect } from 'react';
import axios, { all } from 'axios';

export const SearchBar = ({searchInput, setSearchInput}) => {
    
    const [query, setQuery] = useState("");
    const [allGames, setAllGames] = useState([]);
    const [queryResults, setQueryResults] = useState([]);
    const [isAvailable, setIsAvailable] = useState(false); // Suggest Box Invis State

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

        // Nothing is Searched
        if(value.length === 0){
            setIsAvailable(false);
            return
        }

        const filtered = allGames.filter(game => game.name.toLowerCase().startsWith(value)).sort((a, b) => b.review_count - a.review_count);

        // No Suitable Games
        if(filtered.length === 0){
            setIsAvailable(false);
        }

        // Games Found
        if(filtered.length === 1 && filtered[0].name === query){
            setIsAvailable(false);
        }
        else if(filtered.length > 0){
            setIsAvailable(true);
        }

        setQueryResults(filtered);

    }, [query])

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const handlePick = (name) => {
        setQuery(name);
        setIsAvailable(false);
        handleSearch(name);
    }

    const handleSearch = (inputName) => {
        // Game not found in Database
        const exist = allGames.some(g => g.name === inputName);
        if(!exist){
            return;
        }

        // Send Query to Process
        setIsAvailable(false);
        setSearchInput(inputName);

        // Redirect
        window.scrollTo({
            top: window.innerHeight, 
            behavior: "smooth"
        });
    }

    return (
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="search-container">
                <input type="text" value={query} placeholder="Find your game. . ." className="searchbar" autoComplete="off" onChange={handleChange}/>
                <button className="search-button" onClick={() => handleSearch(query)}>
                    <i className="fa-solid fa-magnifying-glass search-icon" />
                </button>
            </div>
            <div className={`suggestion-box ${isAvailable ? "show" : ""}`}>
                {queryResults.map((game, idx) => (
                    <div key={idx} className="result" onClick={() => handlePick(game.name)}>
                        <p>{game.name}</p>
                    </div>
                ))
                }
            </div>
        </div>
    );
}