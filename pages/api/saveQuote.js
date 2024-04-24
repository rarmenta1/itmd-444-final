// pages/api/saveQuote.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { quote, character, series } = req.body;
    try {
      // Check if anime exists, if not, create it
      let anime;
      const existingAnime = await prisma.anime.findFirst({
        where: { title: series },
      });
      if (existingAnime) {
        anime = existingAnime;
      } else {
        anime = await prisma.anime.create({ data: { title: series } });
      }

      // Check if character exists, if not, create it
      let characterEntity;
      const existingCharacter = await prisma.character.findFirst({
        where: { name: character, animeid: anime.id },
      });
      if (existingCharacter) {
        characterEntity = existingCharacter;
      } else {
        characterEntity = await prisma.character.create({
          data: {
            name: character,
            Anime: { connect: { id: anime.id } },
          },
        });
      }

      // Save the quote along with the associated anime and character
      const newQuote = await prisma.quote.create({
        data: {
          text: quote,
          Anime: { connect: { id: anime.id } },
          Character: { connect: { id: characterEntity.id } },
        },
      });
      console.log('Quote saved:', newQuote);
      res.status(201).json(newQuote);
    } catch (error) {
      console.error('Error saving quote:', error);
      res.status(500).json({ error: 'Failed to save quote' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
