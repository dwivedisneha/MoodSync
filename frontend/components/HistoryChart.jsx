import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function HistoryChart({ moods }) {
  const moodCounts = { happy: 0, sad: 0, excited: 0, calm: 0, angry: 0 };

  moods.forEach(mood => {
    if (moodCounts[mood.mood] !== undefined) {
      moodCounts[mood.mood]++;
    }
  });

  const chartData = {
    labels: Object.keys(moodCounts),
    datasets: [
      {
        label: 'Mood Counts',
        data: Object.values(moodCounts),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="history-chart mt-8">
      <h2 className="text-xl font-semibold">Your Mood History</h2>
      <Line data={chartData} />
    </div>
  );
}

export default HistoryChart;
