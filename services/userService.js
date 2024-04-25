// services/userService.js
import { PrismaClient, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/auth'; // Import hashPassword function

const prisma = new PrismaClient();

// Create a new user
export const createUser = async ({ email, password }) => {
  try {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error('Email is already in use');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

// Retrieve a user by email
export const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw new Error('Error retrieving user by email: ' + error.message);
  }
};
