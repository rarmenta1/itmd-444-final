// pages/index.js
import React from 'react';
import { useRouter } from 'next/router';
import { fetchRandomQuote } from '../utils/animeChanApi';

const Home = () => {
  const router = useRouter();
  const [quote, setQuote] = React.useState('');
  const [character, setCharacter] = React.useState('');
  const [series, setSeries] = React.useState('');

  const generateRandomQuote = async () => {
    try {
      const { quote, character, anime } = await fetchRandomQuote();
      setQuote(quote);
      setCharacter(character);
      setSeries(anime);
    } catch (error) {
      console.error('Error fetching random quote:', error);
    }
  };

  const saveQuote = async () => {
    try {
      const response = await fetch('/api/saveQuote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quote, character, series }),
      });
      if (response.ok) {
        console.log('Quote saved successfully');
        router.push('/quotes');
      } else {
        console.error('Failed to save quote:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving quote:', error);
    }
  };

  const goToQuoteList = () => {
    router.push('/quotes');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={generateRandomQuote}>Generate Random Quote</button>
      <button onClick={goToQuoteList}>Go to Quote List</button>
      {quote && (
        <div>
          <p>"{quote}"</p>
          <p>- {character} from {series}</p>
          <button onClick={saveQuote}>Save Quote</button>
        </div>
      )}
    </div>
  );
};

export default Home;
