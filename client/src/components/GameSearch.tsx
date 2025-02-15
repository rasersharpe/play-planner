import React, { useState } from 'react';
import { GameInterface } from "../Interface/GameInterface";

const apiKey = import.meta.env.VITE_API_KEY;

const GameSearch: React.FC = () => {
  const [game, setGame] = useState<GameInterface | null>(null);
  const [gameTitle, setGameTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = () => {
    if (gameTitle) {
      fetchGame(gameTitle);
    }
  };

  const fetchGame = async (title: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.rawg.io/api/games?search=${title}&key=${apiKey}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setGame(data.results[0]);
      } else {
        setGame(null);
      }
    } catch (error) {
      console.error('Error fetching game:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={gameTitle}
        onChange={(e) => setGameTitle(e.target.value)}
        placeholder="Enter game title"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <div>Loading...</div>}

      {game && (
        <div>
          <h1>{game.name}</h1>
          <img src={game.background_image} alt={game.name} />
          <p>{game.description_raw}</p>
        </div>
      )}

      {!loading && !game && <div>No game found</div>}
    </div>
  );
};

export default GameSearch;