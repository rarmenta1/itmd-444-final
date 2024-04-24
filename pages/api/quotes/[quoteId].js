// pages/api/quotes/[quoteId].js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { quoteId: id } = req.query;

  if (req.method === 'GET') {
    try {
      const quote = await prisma.quote.findUnique({
        where: { id: parseInt(id) },
      });
      if (!quote) {
        res.status(404).json({ error: 'Quote not found' });
      } else {
        res.status(200).json(quote);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quote' });
    }
  } else if (req.method === 'PUT') {
    const { text, animeId, characterId } = req.body;
    try {
      const updatedQuote = await prisma.quote.update({
        where: { id: parseInt(id) },
        data: { text, Anime: { connect: { id: animeId } }, Character: { connect: { id: characterId } } },
      });
      res.status(200).json(updatedQuote);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update quote' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.quote.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete quote' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
