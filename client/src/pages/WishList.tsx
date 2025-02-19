import { useEffect, useState } from "react";
import { GameInterface } from "../interfaces/GameInterface";
import AuthService from "../utils/auth";

const WishList = () => {
  const [games, setGames] = useState<GameInterface[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const isLoggedIn = AuthService.loggedIn();
  console.log("Is user logged in?", isLoggedIn); // Debugging statement
  const user = isLoggedIn ? AuthService.getProfile() : null;
  console.log("User profile:", user); // Debugging statement

  useEffect(() => {
    // Fetch the user profile from the API
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${AuthService.getToken()}`,
          },
        });
        if (response.ok) {
          const user = await response.json();
          console.log("Fetched user profile:", user); // Debugging statement
          setUserId(user.id);
        } else {
          console.error("Error fetching user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    // Fetch the wishlist games from the API
    const fetchWishList = async () => {
      if (userId) {
        console.log("Fetching wishlist for user:", userId); // Debugging statement
        const response = await fetch(`/api/users/${userId}/wishlist`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched wishlist data:", data); // Debugging statement
          setGames(data);
        } else {
          console.error("Error fetching wishlist games");
        }
      } else {
        console.error("User not authenticated");
      }
    };

    fetchWishList();
  }, [userId]);

  return (
    <div className="games-list">
      <h1>Wish List</h1>
      {games.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game.id} className="game-item">
              <h2>{game.name}</h2>
              <img src={game.background_image} alt={game.name} />
              <p>{game.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishList;