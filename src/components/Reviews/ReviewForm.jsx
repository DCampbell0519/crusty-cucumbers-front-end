import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { createReview, updateReview } from "../../services/reviewService.js";

const ReviewForm = ({ movieId, existingReview, onSuccess, onCancel }) => {
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState(existingReview?.rating || 1);
  const [reviewText, setReviewText] = useState(
    existingReview?.reviewText || ""
  );
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingReview) {
        await updateReview(existingReview._id, { rating, reviewText });
      } else {
        await createReview(movieId, { rating, reviewText });
      }
      onSuccess();
    } catch (err) {
      setError(err.message || "Failed to submit review");
    }
  };

  if (!user) return <p>Please sign in to add a review.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Review:
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          rows={4}
          cols={50}
        />
      </label>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">
        {existingReview ? "Update" : "Submit"} Review
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel} style={{ marginLeft: "1rem" }}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ReviewForm;
