// pages/api/auth/login.js
import { getUserByEmail } from '../../../services/userService';
import { comparePasswords, generateToken } from '../../../utils/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    // Retrieve user from the database by email
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordsMatch = await comparePasswords(password, user.password);

    if (!passwordsMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken({ userId: user.id, email: user.email });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}