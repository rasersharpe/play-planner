import express from 'express';
import { Request, Response } from 'express';
import { PlayedGame } from '../../models/played-game.js';
import { WishList } from '../../models/wish-list.js';
import { User } from '../../models/user.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = express.Router();

// POST /users/:id/played - Add a game to the Played Games list
router.post('/:id/played', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  console.log('Received User:', req.user); 
  if (!req.user) {
    res.status(401).json({ message: 'User not authenticated' });  // Ensure user is authenticated
    return;
  }
  const { id } = req.params;
  const { gameId, name, background_image } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check if the game already exists for the user
    const existingPlayedGame = await PlayedGame.findOne({
      where: { userId: user.id, gameId },
    });

    console.log(existingPlayedGame, user.id, gameId)

    if (existingPlayedGame) {
      res.status(400).json({ message: 'Game already added to played games' });
      return;
    }

    const playedGame = await PlayedGame.create({
      userId: user.id,
      gameId,
      name,
      background_image,
    });

    res.status(201).json(playedGame);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// POST /users/:id/wishlist - Add a game to the Wish List
router.post('/:id/wishlist', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { gameId, name, background_image } = req.body;

  try {
    console.log("Authenticated User:", req.user);
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; // Ensure the response is returned to stop further execution
    }

    // Check if the game already exists in the wish list for the user
    const existingWishListGame = await WishList.findOne({
      where: { userId: user.id, gameId },
    });
    console.log(existingWishListGame, user.id, gameId)
    if (existingWishListGame) {
      res.status(400).json({ message: 'Game already added to wish list' });
      return;
    }

    const wishListGame = await WishList.create({
      userId: user.id,
      gameId,
      name,
      background_image,
    });

    res.status(201).json(wishListGame);
  } catch (error) {
    console.error("Error adding game to wish list:", error);
    res.status(500).json({ message: (error as Error).message });
  }
});

// GET /users/:id/played - Get all played games for a user
router.get('/:id/played', async (req: Request, res: Response): Promise<void> => {
  console.log("User ID:", req.params.id, req.user);
  const { id } = req.params;
    // Ensure the user is logged in and check their userId
    if (!req.user || req.user.id !== Number(id)) {
      res.status(401).json({ message: 'Please login to view your wishlist' });
      return;
    }
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const playedGames = await PlayedGame.findAll({
      where: { userId: id },
    });

    res.json(playedGames);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// GET /users/:id/wishlist - Get all wish list games for a user
router.get('/:id/wishlist', async (req: Request, res: Response): Promise<void> => {
  console.log("User ID:", req.params.id, req.user);
  const { id } = req.params;
  // Ensure the user is logged in and check their userId
  if (!req.user || req.user.id !== Number(id)) {
    res.status(401).json({ message: 'Please login to view your wishlist' });
    return;
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const wishList = await WishList.findAll({
      where: { userId: id },
    });

    res.json(wishList);
  } catch (error) {
    console.error("Error fetching wish list games:", error);
    res.status(500).json({ message: (error as Error).message });
  }
});

export { router as userRouter };


