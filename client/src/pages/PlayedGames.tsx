import React, { useState, useEffect } from "react";

interface PlayedGame {
  id: number;
  name: string;
  background_image: string;
  description: string;
}

const PlayedGames: React.FC = () => {
  const [playedGames, setPlayedGames] = useState<PlayedGame[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch played games from backend
  useEffect(() => {
    const fetchPlayedGames = async () => {
      try {
        const response = await fetch('/api/played');
        if (!response.ok) {
          throw new Error('Failed to fetch played games');
        }
        const data = await response.json();
        setPlayedGames(data);
      } catch (err) {
        setError('Error loading played games.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayedGames();
  }, []);

  if (loading) {
    return <div>Loading played games...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>My Played Games</h1>
      {playedGames.length > 0 ? (
        <div className="played-games-list">
          {playedGames.map((game) => (
            <div key={game.id} className="played-game-item">
              <h2>{game.name}</h2>
              <img src={game.background_image} alt={game.name} />
              <p>{game.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No played games found</div>
      )}
    </div>
  );
};

export default PlayedGames;
