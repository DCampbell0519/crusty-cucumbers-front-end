import React, { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';

export default function ReviewList({ movieId, currentUserId, token }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/movies/${movieId}/reviews`);
      if (!res.ok) throw new Error('Failed to load reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  const handleAddSuccess = (newReview) => {
    setReviews(prev => [...prev, newReview]);
  };

  const handleUpdate = (updatedReview) => {
    setReviews(prev => prev.map(r => (r._id === updatedReview._id ? updatedReview : r)));
  };

  const handleDelete = (id) => {
    setReviews(prev => prev.filter(r => r._id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-50 rounded shadow">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Reviews</h3>

      {token ? (
        <ReviewForm movieId={movieId} onSuccess={handleAddSuccess} token={token} />
      ) : (
        <p className="mb-4 text-gray-600">Please log in to add a review.</p>
      )}

      {loading && <p className="text-gray-500">Loading reviews...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && reviews.length === 0 && <p className="text-gray-600">No reviews yet.</p>}

      <div className="mt-6">
        {reviews.map(review => (
          <ReviewItem
            key={review._id}
            review={review}
            currentUser Id={currentUserId}
            token={token}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}