// src/app/utils/auth.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secret = process.env.JWT_SECRET; // Use environment variable for secret key
const expiresIn = '1h';

// Generate JWT token
export const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn });
};

// Hash a password
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Compare passwords
export const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};