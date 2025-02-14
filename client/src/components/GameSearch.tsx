import dotenv from 'dotenv';
import React, { useState } from 'react';
import { GameInterface } from '../Interface/GameInterface';

dotenv.config();
export const API_KEY = process.env.REACT_APP_API_KEY;



// React.FC functional component to search for games
const GameComponent: React.FC = () => {
  // useStaate hook to store game data (title, image, description)
  const [games, setGames] = useState<GameInterface[]>([]);
  const [gameTitle, setGameTitle] = useState<string>('');
// function to fetch game data from the API
  const fetchGame = async () => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?search=${gameTitle}&key=${API_KEY}`);
    const data = await response.json();
    if (data.results)  {
      const gameData = data.results[0];
      setGames([{
        id: gameData.id,
        title: gameData.name,
        image: gameData.background_image,
        description: gameData.description_raw,
      }]);
    } else {
      setGames([]);
    }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchGame();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input 
        type='text'
        value={gameTitle}
        onChange={(e) => setGameTitle(e.target.value)}
        placeholder='search for a game'
        />
        <button type='submit'>Search</button>
      </form>
      <div>
          {games.map((game) => (
            <div key={game.id}>
              <h1>{game.title}</h1>
              <img src={game.image} alt={game.title} />
              <p>{game.description}</p>
            </div>
          ))}
        </div>
    </div>);
};
export default GameComponent;