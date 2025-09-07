import React, { useState } from 'react';

export default function ReviewForm({ movieId, existingReview, onSuccess, token }) {
  const [rating, setRating] = useState(existingReview?.rating || 5);
  const [reviewText, setReviewText] = useState(existingReview?.reviewText || '');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(existingReview);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (rating < 1 || rating > 10) {
      setError('Rating must be between 1 and 10');
      setLoading(false);
      return;
    }
    if (!reviewText.trim()) {
      setError('Review text cannot be empty');
      setLoading(false);
      return;
    }

    try {
      const url = isEdit
        ? `/api/reviews/${existingReview._id}`
        : `/api/movies/${movieId}/reviews`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, reviewText }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit review');
      }

      const data = await res.json();
      onSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-md mx-auto">
      <label className="block mb-2 font-semibold text-gray-700">
        Rating:
        <select
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4 font-semibold text-gray-700">
        Review:
        <textarea
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {isEdit ? 'Update Review' : 'Add Review'}
      </button>
    </form>
  );
}