// pages/api/quotes/index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const quotes = await prisma.quote.findMany();
      res.status(200).json(quotes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quotes' });
    }
  } else if (req.method === 'POST') {
    const { text, animeId, characterId } = req.body;
    try {
      const newQuote = await prisma.quote.create({
        data: { text, Anime: { connect: { id: animeId } }, Character: { connect: { id: characterId } } },
      });
      res.status(201).json(newQuote);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create quote' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
