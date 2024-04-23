import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { characterId: id } = req.query;

  if (req.method === 'GET') {
    try {
      const character = await prisma.character.findUnique({
        where: { id: parseInt(id) },
      });
      if (!character) {
        res.status(404).json({ error: 'Character not found' });
      } else {
        res.status(200).json(character);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch character' });
    }
  } else if (req.method === 'PUT') {
    const { name, animeId } = req.body;
    try {
      const updatedCharacter = await prisma.character.update({
        where: { id: parseInt(id) },
        data: { name, Anime: { connect: { id: animeId } } },
      });
      res.status(200).json(updatedCharacter);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update character', details: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.character.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting character:', error);
      res.status(500).json({ error: 'Failed to delete character' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
