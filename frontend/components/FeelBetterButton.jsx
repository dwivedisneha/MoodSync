import React, { useState } from 'react';

function FeelBetterButton() {
  const [quote, setQuote] = useState('');
  const [song, setSong] = useState(null);

  const quotes = [
    "Keep going, you're doing great!",
    "Every day is a new chance for happiness.",
    "Believe in yourself, you are amazing!",
    "Tough times never last, but tough people do.",
    "You got this, keep moving forward!",
  ];

  const songs = [
    { name: 'Happy', artist: 'Pharrell Williams', url: 'https://open.spotify.com/track/6jB11N2LmskDPZZiUjBih4' },
    { name: 'Don\'t Stop Me Now', artist: 'Queen', url: 'https://open.spotify.com/track/5VklOB3Mc5B59g0E3ODdQb' },
    { name: 'Walking on Sunshine', artist: 'Katrina and the Waves', url: 'https://open.spotify.com/track/3Er2oSCEgVxt6ceZzNe9P8' },
  ];

  const getRandomQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  };

  const getRandomSong = () => {
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    setSong(randomSong);
  };

  return (
    <div className="feel-better-button mt-8 text-center">
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded"
        onClick={() => {
          getRandomQuote();
          getRandomSong();
        }}
      >
        Need a Boost? Click Here!
      </button>

      {quote && <p className="mt-4 text-lg italic">{quote}</p>}
      {song && (
        <div className="mt-4">
          <p className="text-xl font-semibold">Here’s a song for you:</p>
          <p className="font-bold">{song.name} by {song.artist}</p>
          <a href={song.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            Listen on Spotify
          </a>
        </div>
      )}
    </div>
  );
}

export default FeelBetterButton;
