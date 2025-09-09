import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { getReviews, deleteReview } from "../../services/reviewService.js";


const API_BASE = import.meta.env.VITE_BACK_END_URL || "";

const ReviewList = ({ movieId }) => {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [movie, setMovie] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [error, setError] = useState("");

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const data = await getReviews(movieId);
      setReviews(data);
    } catch (err) {
      setError(err.message || "Failed to load reviews");
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview(reviewId);
      fetchReviews();
    } catch (err) {
      setError(err.message || "Failed to delete review");
    }
  };

  const handleEditClick = (reviewId) => {
    setEditingReviewId(reviewId);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
  };

  const handleSuccess = () => {
    setEditingReviewId(null);
    fetchReviews();
  };

  return (
    <section>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display movie info */}
      {movie && (
        <div style={{ marginBottom: "1rem" }}>
          <h2>{movie.title} {movie.year ? `(${movie.year})` : ""}</h2>
          <img
            src={movie.posterUrl || "/assets/no-poster.png"}
            alt={movie.title}
            style={{ maxWidth: "200px", borderRadius: "8px" }}
          />
        </div>
      )}

      <h3>Reviews</h3>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {reviews.map((review) =>
          editingReviewId === review._id ? (
            <li key={review._id}>
              <ReviewForm
                movieId={movieId}
                existingReview={review}
                onSuccess={handleSuccess}
                onCancel={handleCancelEdit}
              />
            </li>
          ) : (
            <li
              key={review._id}
              style={{
                marginBottom: "1rem",
                borderBottom: "1px solid #ccc",
                paddingBottom: "0.5rem",
              }}
            >
              <p>
                <strong>{review.userId?.username || "Unknown User"}</strong> rated: {review.rating}/10
              </p>
              <p>{review.reviewText}</p>
              <p style={{ fontSize: "0.8rem", color: "#666" }}>
                {new Date(review.createdAt).toLocaleString()}
              </p>
              {user && user._id === review.userId?._id && (
                <>
                  <button onClick={() => handleEditClick(review._id)}>Edit</button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          )
        )}
      </ul>
    </section>
  );
};

export default ReviewList;