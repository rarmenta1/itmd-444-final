// pages/api/auth/register.js
import { hashPassword } from '../../../utils/auth';
import { createUser } from '../../../services/userService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user in the database
    const newUser = await createUser({ email, password: hashedPassword });

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.message.includes('Email is already in use')) {
      return res.status(400).json({ message: 'Email is already in use' });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
