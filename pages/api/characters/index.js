// pages/api/characters/index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const characters = await prisma.character.findMany();
      res.status(200).json(characters);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch character' });
    }
  } else if (req.method === 'POST') {
    const { name, animeId } = req.body;
    try {
      const newCharacter = await prisma.character.create({
        data: {
          name,
          Anime: { connect: { id: animeId } } // Use Anime directly instead of animeId
        },
      });
      res.status(201).json(newCharacter);
    } catch (error) {
      console.error('Error creating character:', error);
      res.status(500).json({ error: 'Failed to create character', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
