// utils/animeApi.js
export const fetchRandomQuote = async () => {
  try {
    const response = await fetch('https://animechan.xyz/api/random');
    if (!response.ok) {
      throw new Error('Failed to fetch random quote');
    }
    const data = await response.json();
    return {
      quote: data.quote,
      character: data.character,
      anime: data.anime,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchQuoteByAnimeTitle = async (title) => {
  try {
    const response = await fetch(`https://animechan.xyz/api/random/anime?title=${title}`);
    if (!response.ok) {
      throw new Error('Failed to fetch quote by anime title');
    }
    const data = await response.json();
    return {
      quote: data.quote,
      character: data.character,
      anime: data.anime,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchQuoteByCharacter = async (name) => {
  try {
    const response = await fetch(`https://animechan.xyz/api/random/character?name=${name}`);
    if (!response.ok) {
      throw new Error('Failed to fetch quote by character');
    }
    const data = await response.json();
    return {
      quote: data.quote,
      character: data.character,
      anime: data.anime,
    };
  } catch (error) {
    throw error;
  }
};
