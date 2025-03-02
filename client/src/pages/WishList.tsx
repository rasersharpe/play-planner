import { useEffect, useState } from "react";
import { GameInterface } from "../interfaces/GameInterface";
import AuthService from "../utils/auth";

const WishList = () => {
  const [games, setGames] = useState<GameInterface[]>([]);
 const userId = AuthService.loggedIn() ? AuthService.getProfile()?.id : null;
  //console.log("User Profile:", AuthService.loggedIn());
  console.log("User ID:", userId);
  console.log("User Profile Data:", AuthService.getProfile());

  if (!userId) {
    return <p>Please log in to see your Wishlist.</p>;
  }

  useEffect(() => {
    // Fetch the wishlist games from the API
    const fetchWishList = async () => {
      if (userId) {
        const response = await fetch(`/api/users/${userId}/wishlist`, {
          headers: {
            Authorization: `Bearer ${AuthService.getToken()}`,
          },
          });
        if (response.ok) {
          const data = await response.json();
          setGames(data);
        } else {
          console.error("Error fetching wishlist games");
        }
      }
    };

    fetchWishList();
  }, [userId]);
  console.log("wishlist state:", games);
  return (
    <div className="games-list">
      <h2>Wish List</h2>
      {games.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="search__game__container">
          {games.map((game) => (
            <li key={game.id} className="game-item">
              <img
                className="game__image"
                src={game.background_image}
                alt={game.name}
              />
              <h2>{game.name}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishList;
