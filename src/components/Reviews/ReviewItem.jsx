import React from "react";

const ReviewItem = ({ review, isOwner, onEdit, onDelete }) => {
  return (
    <li
      style={{
        marginBottom: "1rem",
        borderBottom: "1px solid #ccc",
        paddingBottom: "0.5rem",
      }}
    >
      <p>
        <strong>{review.userId?.username || "Unknown User"}</strong> rated:{" "}
        {review.rating}/10
      </p>
      <p>{review.reviewText}</p>
      <p style={{ fontSize: "0.8rem", color: "#666" }}>
        {new Date(review.createdAt).toLocaleString()}
      </p>
      {isOwner && (
        <>
          <button onClick={() => onEdit(review._id)}>Edit</button>
          <button
            onClick={() => onDelete(review._id)}
            style={{ marginLeft: "0.5rem" }}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default ReviewItem;
