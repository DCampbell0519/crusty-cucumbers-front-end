import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReviewList from './ReviewList';


function App() {
  // TODO
  const movieId = '';
  const currentUserId = '';
  const token = 'JWT_SECRET=crustycucumbersaintsocrusty';
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700">Crusty Cucumbers</h1>
        <p className="text-gray-600 mt-1">Movie Reviews</p>
      </header>
      <main>
        <ReviewList movieId={movieId} currentUserId={currentUserId} token={token} />
      </main>
    </div>
  );
}
export default App;