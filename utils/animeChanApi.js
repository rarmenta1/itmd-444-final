// src/app/utils/animeApi.js
export const fetchRandomQuote = async () => {
  const response = await fetch('https://animechan.xyz/api/random');
  if (!response.ok) {
    throw new Error('Failed to fetch random quote');
  }
  return await response.json();
};

export const fetchQuoteByAnimeTitle = async (title) => {
  const response = await fetch(`https://animechan.xyz/api/random/anime?title=${title}`);
  if (!response.ok) {
    throw new Error('Failed to fetch quote by anime title');
  }
  return await response.json();
};

export const fetchQuoteByCharacter = async (name) => {
  const response = await fetch(`https://animechan.xyz/api/random/character?name=${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch quote by character');
  }
  return await response.json();
};
