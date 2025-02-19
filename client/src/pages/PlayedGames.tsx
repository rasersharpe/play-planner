import { useEffect, useState } from "react";
import { GameInterface } from "../interfaces/GameInterface";
import AuthService from "../utils/auth";

const PlayedGames = () => {
  const [games, setGames] = useState<GameInterface[]>([]);
  const userId = AuthService.loggedIn() ? AuthService.getProfile()?.id : null;
  console.log("User Profile:", AuthService.loggedIn());
  console.log("User ID:", userId);
  
  if (!userId) {
    return <p>Please log in to see your played games.</p>;
  }


  useEffect(() => {
    // Fetch the played games from the API
    const fetchPlayedGames = async () => {
      if (userId) {
        const token = AuthService.getToken();
        const response = await fetch(`/api/users/${userId}/played`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Played Games:", data);  // Check the data returned
          setGames(data);
        } else {
          console.error("Error fetching played games");
        }
      }
    };
    
    
    

    fetchPlayedGames();
  }, [userId]);
  console.log("Games state:", games);

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
