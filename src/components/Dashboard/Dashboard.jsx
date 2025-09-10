import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { index as fetchUsersIndex } from "../../services/userService";

const API_BASE = import.meta.env.VITE_BACK_END_URL || "";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const getJSON = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  };

  useEffect(() => {
    let ignore = false;

    const loadCurrentYear = async () => {
      try {
        setStatus("loading");
        setError("");
        const data = await getJSON(
          `${API_BASE}/api/movies/search?year=${currentYear}`
        );
        if (ignore) return;
        setMovies(data);
        setStatus(data.length ? "idle" : "empty");
      } catch (e) {
        if (ignore) return;
        setError(e.message || "Failed to load movies");
        setStatus("error");
      }
    };

    loadCurrentYear();
    return () => {
      ignore = true;
    };
  }, [API_BASE, currentYear]);

  const handleMovieSearchSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const term = String(form.get("q") || "").trim();

    try {
      setStatus("loading");
      setError("");

      const url = term
        ? `${API_BASE}/api/movies/search?title=${encodeURIComponent(term)}`
        : `${API_BASE}/api/movies/search?year=${currentYear}`;

      const data = await getJSON(url);
      setMovies(data);
      setStatus(data.length ? "idle" : "empty");
    } catch (e) {
      setError(e.message || "Search failed");
      setStatus("error");
    }
  };

  const MovieCard = ({ movie }) => {
    const { imdbID, title, year, posterUrl } = movie;
    const fallback = "/assets/no-poster.png";
    return (
      <div className="movie-card">
        <Link to={`/movies/${imdbID}`} className="movie-card__link">
          <img
            src={posterUrl || fallback}
            alt={title}
            className="movie-card__poster"
          />
          <div className="movie-card__meta">
            <h3 className="movie-card__title" title={title}>
              {title}
            </h3>
            {year ? <span className="movie-card__year">{year}</span> : null}
          </div>
        </Link>
      </div>
    );
  };

  return (
    <main className="dashboard">
      <section className="dashboard__section">
        <form onSubmit={handleMovieSearchSubmit} className="movies__search">
          <input
            name="q"
            placeholder="Search movies by title…"
            aria-label="Search movies by title"
            className="movies__input"
          />
          <button type="submit" className="movies__button">
            Search
          </button>
        </form>

        {status === "loading" && (
          <p className="state state--loading">Loading…</p>
        )}
        {status === "error" && (
          <p className="state state--error">Error: {error}</p>
        )}
        {status === "empty" && (
          <p className="state state--empty">No movies found.</p>
        )}

        {status !== "loading" && status !== "error" && movies.length > 0 && (
          <div className="movies-grid">
            {movies.map((m) => (
              <MovieCard key={m.imdbID} movie={m} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
