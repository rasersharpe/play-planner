import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({ username, id: user.id }, secretKey, { expiresIn: '6h' });
  return res.json({ token, userId: user.id });
};

const router = Router();

router.post('/login', login);

// Handle the signup request
router.post('/signup', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password,
    });

    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ username: newUser.username, id: newUser.id }, secretKey, { expiresIn: '6h' });

    // Respond with the newly created user (or some other meaningful data)
    return res.status(201).json({
      message: 'Signup successful',
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
      token,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error signing up user' });
  }
});

export default router;
