// TODO: create an interface that will be used to display the game
// inteface should include the title, an image of the game, a description of the game
import dotenv from 'dotenv';
import React, {useEffect, useState } from 'react';

dotenv.config();
export const API_KEY = process.env.REACT_APP_API_KEY;

export interface GameInterface {
    id: number;
    title: string;
    image: string;
    description: string;
}

const GameComponent: React.FC<GameInterface> = (props) => {
  const [game, setGame] = useState<GameInterface | null>(null);
  
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games/{game_id}?key=${API_KEY}`);
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error('Error fetching game:', error);
      }
    };
    fetchGame();
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{game.title}</h1>
      <img src={game.image} alt={game.title} />
      <p>{game.description}</p>
    </div>
  );
};