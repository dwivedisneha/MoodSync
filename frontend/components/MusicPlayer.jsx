import React from 'react';

function MusicPlayer({ tracks }) {
  return (
    <div className="music-player mt-8">
      <h2 className="text-xl font-semibold">Recommended Songs</h2>
      {tracks.length === 0 ? (
        <p className="text-gray-500">No music recommendations yet. Please log your mood.</p>
      ) : (
        <div className="tracks-list mt-4">
          {tracks.map((track, index) => (
            <div key={index} className="track-item flex justify-between items-center mb-4">
              <div>
                <p className="font-bold">{track.name}</p>
                <p className="text-gray-600">{track.artist}</p>
              </div>
              <a href={track.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                Listen on Spotify
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MusicPlayer;
