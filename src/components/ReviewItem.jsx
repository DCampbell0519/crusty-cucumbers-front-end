import React, { useState } from 'react';
import ReviewForm from './ReviewForm';

export default function ReviewItem({ review, currentUserId, token, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const canEdit = currentUserId === review.userId._id;

  const handleDelete = async () => {
    if (!window.confirm('Delete this review?')) return;
    try {
      const res = await fetch(`/api/reviews/${review._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete review');
      }
      onDelete(review._id);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateSuccess = (updatedReview) => {
    onUpdate(updatedReview);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <ReviewForm
        movieId={review.movieId}
        existingReview={review}
        onSuccess={handleUpdateSuccess}
        token={token}
      />
    );
  }

  return (
    <div className="border border-gray-300 rounded p-4 mb-4 bg-white shadow-sm">
      <p className="font-semibold text-gray-800">
        {review.userId.username} rated: <span className="text-indigo-600">{review.rating}/10</span>
      </p>
      <p className="mt-2 text-gray-700">{review.reviewText}</p>
      <p className="mt-1 text-sm text-gray-500">
        {new Date(review.createdAt).toLocaleString()}
      </p>
      {canEdit && (
        <div className="mt-3 space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}