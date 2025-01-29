import React, { useState } from 'react';

function MoodLogger({ fetchMoods, fetchMusic }) {
  const [selectedMood, setSelectedMood] = useState('');

  const moods = ['happy', 'sad', 'excited', 'calm', 'angry'];

  const handleMoodSubmit = async () => {
    if (!selectedMood) return;
    await fetch('https://your-backend-url.com/api/moods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood: selectedMood }),
    });

    fetchMoods();
    fetchMusic(selectedMood);
    setSelectedMood('');
  };

  return (
    <div className="mood-logger text-center">
      <h2 className="text-xl font-semibold my-4">How are you feeling today?</h2>
      <div className="flex justify-center space-x-4">
        {moods.map((mood) => (
          <button
            key={mood}
            className={`px-4 py-2 rounded ${selectedMood === mood ? 'bg-green-500' : 'bg-gray-200'}`}
            onClick={() => setSelectedMood(mood)}
          >
            {mood}
          </button>
        ))}
      </div>
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
        onClick={handleMoodSubmit}
      >
        Submit Mood
      </button>
    </div>
  );
}

export default MoodLogger;
