import React, { useState } from "react";
import { GameInterface } from "../interfaces/GameInterface";
import AuthService from "../utils/auth";
const apiKey = import.meta.env.VITE_API_KEY;

const GameSearch: React.FC = () => {
  const [game, setGame] = useState<GameInterface | null>(null);
  const [gameTitle, setGameTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [userId] = useState<number>(1);

  const handleSearch = () => {
    if (gameTitle) {
      fetchGame(gameTitle);
    }
  };

  const fetchGame = async (title: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?search=${title}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const firstGame = data.results[0];
        setGame({
          id: firstGame.id,
          gameId: firstGame.id,
          name: firstGame.name,
          background_image: firstGame.background_image,
          description: firstGame.description,
        });
      } else {
        setGame(null);
      }
    } catch (error) {
      console.error("Error fetching game:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPlayed = async () => {
    if (game && userId) {
      try {
        // Get the JWT token from localStorage
        const token = AuthService.getToken();
        console.log("Token:", token);
        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await fetch(`/api/users/${userId}/played`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            gameId: game.id,
            name: game.name,
            background_image: game.background_image,
            description: game.description,
          }),
        });

        if (response.ok) {
          window.location.href = "/played";
        } else {
          console.error("Failed to add game to plaed games", response.status);
        }
      } catch (error) {
        console.error("Error adding game to played games:", error);
      }
    }
  };

  const handleAddToWishList = async () => {
    if (game && userId) {
      try {
        // Get the JWT token from localStorage
        const token = AuthService.getToken();

        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await fetch(`/api/users/${userId}/wishlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token here
          },
          body: JSON.stringify({
            gameId: game.id,
            name: game.name,
            background_image: game.background_image,
            description: game.description,
          }),
        });

        if (response.ok) {
          window.location.href = "/wishlist"; // Redirect to the Wishlist page after success
        } else {
          console.error("Failed to add game to wishlist", response.status);
        }
      } catch (error) {
        console.error("Error adding game to wishlist:", error);
      }
    }
  };

  return (
    <section className="search__section">
      <div>
        <input
          type="text"
          value={gameTitle}
          onChange={(e) => setGameTitle(e.target.value)}
          placeholder="Search for a game..."
          className="header__search__bar"
        />
        <button className="search__bar__button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <br />
      <div>
        {loading && <div>Loading...</div>}
        {game && (
          <figure className="search__game__container">
            <div>
              <img
                className="game__image"
                src={game.background_image}
                alt={game.name}
              />
            </div>
            <div>
              <h2>{game.name}</h2>
            </div>
            <div>
              <p>{game.description}</p>
            </div>
            <div className="figure__button__container">
              <button
                className="button__add__wishList"
                onClick={handleAddToWishList}
              >
                Add to Wish List
              </button>
              <button
                className="button__add__playedList"
                onClick={handleAddToPlayed}
              >
                Add to Played
              </button>
            </div>
          </figure>
        )}

        {!loading && !game && <div>No game found</div>}
      </div>
    </section>
  );
};

export default GameSearch;
