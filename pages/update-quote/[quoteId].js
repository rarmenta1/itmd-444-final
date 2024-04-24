import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const UpdateQuote = () => {
  const router = useRouter();
  const { quoteId } = router.query;

  const [quote, setQuote] = useState(null);
  const [text, setText] = useState('');
  const [animeOptions, setAnimeOptions] = useState([]);
  const [characterOptions, setCharacterOptions] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get(`/api/quotes/${quoteId}`);
        setQuote(response.data);
        setText(response.data.text);
        setSelectedAnime(response.data.anime.title);
        setSelectedCharacter(response.data.character.name);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    const fetchAnimeAndCharacters = async () => {
      try {
        const animeResponse = await axios.get('/api/anime');
        const characterResponse = await axios.get('/api/characters');

        setAnimeOptions(animeResponse.data);
        setCharacterOptions(characterResponse.data);
      } catch (error) {
        console.error('Error fetching anime and characters:', error);
      }
    };

    if (quoteId) {
      fetchQuote();
    }

    fetchAnimeAndCharacters();
  }, [quoteId]);

  const handleUpdate = async () => {
    try {
      const animeId = animeOptions.find((anime) => anime.title === selectedAnime)?.id;
      const characterId = characterOptions.find((character) => character.name === selectedCharacter)?.id;

      const response = await axios.put(`/api/quotes/${quoteId}`, {
        text,
        animeId,
        characterId,
      });
      console.log('Quote updated:', response.data);
      router.push('/quotes');
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };

  const handleCancel = () => {
    router.back(); // Go back to the previous page
  };

  if (!quote) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Update Quote</h1>
      <label>
        Text:
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <label>
        Anime:
        <select value={selectedAnime} onChange={(e) => setSelectedAnime(e.target.value)}>
          {animeOptions.map((anime) => (
            <option key={anime.id} value={anime.title}>
              {anime.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        Character:
        <select value={selectedCharacter} onChange={(e) => setSelectedCharacter(e.target.value)}>
          {characterOptions.map((character) => (
            <option key={character.id} value={character.name}>
              {character.name}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleUpdate}>Update Quote</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default UpdateQuote;
