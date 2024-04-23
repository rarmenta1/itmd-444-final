// pages/api/anime/index.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const anime = await prisma.anime.findMany();
      res.status(200).json(anime);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch anime' });
    }
  } else if (req.method === 'POST') {
    const { title } = req.body;
    try {
      const newAnime = await prisma.anime.create({
        data: { title },
      });
      res.status(201).json(newAnime);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create anime' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
