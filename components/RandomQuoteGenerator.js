// components/RandomQuoteGenerator.js
import React from 'react';
import { fetchRandomQuote } from '../utils/animeApi';

const RandomQuoteGenerator = () => {
  const [quoteData, setQuoteData] = React.useState(null);

  const generateRandomQuote = async () => {
    try {
      const quote = await fetchRandomQuote();
      setQuoteData(quote);
    } catch (error) {
      console.error('Error fetching random quote:', error);
    }
  };

  return (
    <div>
      <button onClick={generateRandomQuote}>Generate Random Quote</button>
      {quoteData && (
        <div>
          <p>Quote: {quoteData.quote}</p>
          <p>Character: {quoteData.character}</p>
          <p>Series: {quoteData.anime}</p>
        </div>
      )}
    </div>
  );
};

export default RandomQuoteGenerator;
