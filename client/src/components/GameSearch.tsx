import React, { useState } from 'react';
import { GameInterface } from "../interfaces/GameInterface";
const apiKey = import.meta.env.VITE_API_KEY;

const GameSearch: React.FC = () => {
  const [game, setGame] = useState<GameInterface | null>(null);
  const [gameTitle, setGameTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [userId] = useState<number>(1); // Assuming user ID is known (can be set from the authenticated session)

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
        const firstGame = data.results[0];
        setGame({
          id: firstGame.id,
          name: firstGame.name,
          background_image: firstGame.background_image,
          description_raw: firstGame.description_raw,
        });
      } else {
        setGame(null);
      }
    } catch (error) {
      console.error('Error fetching game:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPlayed = async () => {
    if (game) {
      const response = await fetch(`/api/users/${userId}/played`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: game.id,
          name: game.name,
          background_image: game.background_image,
          description: game.description_raw,
        }),
      });
      if (response.ok) {
        window.location.href = '/played'; // Redirect to the Played Games page after success
      }
    }
  };

  const handleAddToWishList = async () => {
    if (game) {
      const response = await fetch(`/api/users/${userId}/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: game.id,
          name: game.name,
          background_image: game.background_image,
          description: game.description_raw,
        }),
      });
      if (response.ok) {
        window.location.href = '/wishlist'; // Redirect to the Wish List page after success
      }
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
          <button onClick={handleAddToPlayed}>Add to Played</button>
          <button onClick={handleAddToWishList}>Add to Wish List</button>
        </div>
      )}

      {!loading && !game && <div>No game found</div>}
    </div>
  );
};

export default GameSearch;
