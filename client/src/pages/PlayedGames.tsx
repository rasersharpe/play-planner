import { useEffect, useState } from "react";
import { GameInterface } from "../interfaces/GameInterface";
import AuthService from "../utils/auth";

const PlayedGames = () => {
  const [games, setGames] = useState<GameInterface[]>([]);
  const userId = AuthService.loggedIn() ? AuthService.getProfile()?.id : null;

  useEffect(() => {
    // Fetch the played games from the API
    const fetchPlayedGames = async () => {
      if (userId) {
        const response = await fetch(`/api/users/${userId}/played`);
        if (response.ok) {
          const data = await response.json();
          setGames(data);
        } else {
          console.error("Error fetching played games");
        }
      }
    };

    fetchPlayedGames();
  }, [userId]);

  return (
    <div className="games-list">
      <h1>Played Games</h1>
      {games.length === 0 ? (
        <p>You have not marked any games as played yet.</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game.id} className="game-item">
              <h2>{game.name}</h2>
              <img src={game.background_image} alt={game.name} />
              <p>{game.description_raw}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayedGames;
