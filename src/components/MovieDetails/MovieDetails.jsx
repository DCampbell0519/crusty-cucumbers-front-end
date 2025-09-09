import { useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import ReviewList from "../Reviews/ReviewList.jsx";
import ReviewForm from "../Reviews/ReviewForm.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import './MovieDetails.css';


const API_BASE = import.meta.env.VITE_BACK_END_URL || "";

const MovieDetails = () => {
    const { imdbID } = useParams();
    const { user } = useContext(UserContext);

      const [movie, setMovie] = useState(null);
      const [status, setStatus] = useState("idle");
      const [error, setError] = useState("");
      const [showReviewForm, setShowReviewForm] = useState(false);

      const getJSON = async (url) => {
        const res = await fetch(url);
        const type = res.headers.get("content-type") || "";
        if(!res.ok || !type.includes("application/json")) {;
            const text = await res.text();
            throw new Error(`Bad response (${res.status}): ${text.slice(0,120)}...`);
        }
        return res.json();
      };

      useEffect(() => {
        let ignore = false;

        const load = async () => {
            try {
                setStatus("loading");
                setError("");
                const data = await getJSON(`${API_BASE}/api/movies/${imdbID}`);
                if (ignore) return;
                setMovie(data);
                setStatus("idle");
            } catch (e) {
                if (ignore) return;
                setError(e.message || "Failed to load movie");
                setStatus("error");
            }
        }
        if (imdbID) load();
        return () => {
           ignore = true };
      }, [API_BASE, imdbID]);

      if (status === "loading") return ( <main className="details"><p className="state state--loading">Loading...</p></main> );
      if (status === "error") return ( <main className="details"><p className="state state--error">Error: {error}</p></main> );
      if (!movie) return null;

      const {
        title,
        year,
        posterUrl,
        genre,
        director,
        plot,
        runtimeMinutes,
        averageRating, 
        totalReviews,
      } = movie;

      const fallback = "/assets/no-poster.png";

      return (
    <main className="details">
      <nav className="details__nav">
        <Link to="/" className="details__back">← Back to Movies</Link>
      </nav>
      <section className="details__hero">
        <img
          src={posterUrl || fallback}
          alt={title}
          className="details__poster"
        />
        <div className="details__meta">
          <h1 className="details__title">
            {title} {year ? <span className="details__year">({year})</span> : null}
          </h1>
          <ul className="details__facts">
            {genre && <li><strong>Genre:</strong> {genre}</li>}
            {director && <li><strong>Director:</strong> {director}</li>}
            {runtimeMinutes ? <li><strong>Runtime:</strong> {runtimeMinutes} min</li> : null}
            <li><strong>IMDb ID:</strong> {imdbID}</li>
          </ul>
          <div className="details__aggregate">
            <div className="details__rating">
              <span className="rating__value">{averageRating?.toFixed?.(1) ?? "0.0"}</span>
              <span className="rating__label">Avg Rating</span>
            </div>
            <div className="details__reviews-count">
              <span className="reviews__value">{totalReviews ?? 0}</span>
              <span className="reviews__label">Reviews</span>
            </div>
          </div>
        </div>
      </section>
      {plot && (
        <section className="details__section">
          <h2 className="section__heading">Overview</h2>
          <p className="details__plot">{plot}</p>
        </section>
      )}
      <section className="details__section">
        <h2 className="section__heading">Reviews</h2>
        {totalReviews === 0 && (
          <p className="section__empty">No reviews yet. Be the first to review this movie.</p>
        )}
        <button className="reviews_add">+ Add Review</button>
      </section>
    </main>
  )
}

export default MovieDetails;