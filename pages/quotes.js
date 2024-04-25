import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quotesResponse = await axios.get('/api/quotes');
        const animeResponse = await axios.get('/api/anime');
        const charactersResponse = await axios.get('/api/characters');

        const quotesData = quotesResponse.data.map((quote) => {
          const anime = animeResponse.data.find((anime) => anime.id === quote.animeid);
          const character = charactersResponse.data.find((character) => character.id === quote.characterid);
          return {
            ...quote,
            series: anime ? anime.title : 'Unknown',
            character: character ? character.name : 'Unknown',
          };
        });

        setQuotes(quotesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const goToHome = () => {
    router.push('/home');
  };

  const handleUpdate = (quoteId) => {
    router.push(`/update-quote/${quoteId}`);
  };

  const handleDelete = async (quoteId) => {
    try {
      await axios.delete(`/api/quotes/${quoteId}`);
      setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== quoteId));
      console.log('Quote deleted successfully');
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  return (
    <div>
      <h1>Quote List</h1>
      <button onClick={goToHome}>Go back to Home</button>
      <ul>
        {quotes.map((quote) => (
          <li key={quote.id}>
            <p>"{quote.text}"</p>
            <p>- {quote.character} from {quote.series}</p>
            <button onClick={() => handleUpdate(quote.id)}>Update</button>
            <button onClick={() => handleDelete(quote.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuoteList;
