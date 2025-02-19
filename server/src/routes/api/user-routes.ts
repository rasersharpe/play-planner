import express from 'express';
import { Request, Response } from 'express';
import { PlayedGame } from '../../models/played-game.js';
import { WishList } from '../../models/wish-list.js';
import { User } from '../../models/user.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = express.Router();

// POST /users/:id/played - Add a game to the Played Games list
router.post('/:id/played', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { gameId, name, background_image, description } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const playedGame = await PlayedGame.create({
      userId: user.id,
      gameId,
      name,
      background_image,
      description,
    });

    res.status(201).json(playedGame);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// POST /users/:id/wishlist - Add a game to the Wish List
router.post('/:id/wishlist', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { gameId, name, background_image, description } = req.body;

  try {
    console.log("Authenticated User:", req.user);
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; // Ensure the response is returned to stop further execution
    }

    const wishListGame = await WishList.create({
      userId: user.id,
      gameId,
      name,
      background_image,
      description,
    });

    res.status(201).json(wishListGame);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// GET /users/:id/played - Get all played games for a user
router.get('/:id/played', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
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
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const wishList = await WishList.findAll({
      where: { userId: id },
    });
    console.log("Wish List:", wishList);
    res.json(wishList);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// GET /users/profile - Get the profile of the authenticated user
router.get('/profile', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error); // debugging statement
    res.status(500).json({ message: (error as Error).message });
  }
});


export { router as userRouter };
