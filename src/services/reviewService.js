const BASE_URL = `${import.meta.env.VITE_BACK_END_URL}/api`;

const getReviews = async (movieId) => {
  try {
    const res = await fetch(`${BASE_URL}/movies/${movieId}/reviews`);
    if (!res.ok) throw new Error("Failed to fetch reviews");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createReview = async (movieId, reviewData) => {
  try {
    const res = await fetch(`${BASE_URL}/movies/${movieId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(reviewData),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to create review");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateReview = async (reviewId, reviewData) => {
  try {
    const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(reviewData),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to update review");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteReview = async (reviewId) => {
  try {
    const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to delete review");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getReviews, createReview, updateReview, deleteReview };
