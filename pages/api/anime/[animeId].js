// pages/api/anime/[animeId].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { animeId: id } = req.query;

  if (req.method === 'GET') {
    try {
      const anime = await prisma.anime.findUnique({
        where: { id: parseInt(id) },
      });
      if (!anime) {
        res.status(404).json({ error: 'Anime not found' });
      } else {
        res.status(200).json(anime);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch anime' });
    }
  } else if (req.method === 'PUT') {
    const { title } = req.body;
    try {
      const updatedAnime = await prisma.anime.update({
        where: { id: parseInt(id) },
        data: { title },
      });
      res.status(200).json(updatedAnime);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update anime' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.anime.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting anime:', error);
      res.status(500).json({ error: 'Failed to delete anime' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
