import React, { useState, useEffect } from 'react';
import MoodLogger from './components/MoodLogger';
import MusicPlayer from './components/MusicPlayer';
import HistoryChart from './components/HistoryChart';

function App() {
  const [moods, setMoods] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);

  const fetchMoods = async () => {
    const response = await fetch('https://your-backend-url.com/api/moods');
    const data = await response.json();
    setMoods(data);
  };

  const fetchMusic = async (mood) => {
    const response = await fetch(`https://your-backend-url.com/api/music/${mood}`);
    const data = await response.json();
    setRecommendedTracks(data);
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center mt-4">MoodSync</h1>
      <MoodLogger fetchMoods={fetchMoods} fetchMusic={fetchMusic} />
      <HistoryChart moods={moods} />
      <MusicPlayer tracks={recommendedTracks} />
    </div>
  );
}

export default App;
