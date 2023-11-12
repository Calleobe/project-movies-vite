import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import "../css/MoviesList.css";


const MoviesList = ({ apiKey }) => {
  const [movies, setMovies] = useState([]);
  const [listType, setListType] = useState("popular"); // New state for list type
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState([]); // Initialize loadedImages state

  // Object mapping list types to their API endpoints
  const apiEndpoints = {
    popular: "popular",
    now_playing: "now_playing",
    top_rated: "top_rated",
    upcoming: "upcoming",
  };
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${apiEndpoints[listType]}?api_key=${apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        setLoading(false);
        setMovies(data.results);
      } catch (error) {
        setLoading(false);
        // Handle errors here
      }
    };

    fetchMovies();
  }, [apiKey, listType]); // Adding listType as a dependency

  return (
    <>
      <div className="Header">
        <h1 className="Logo">Movies To Watch</h1>
        <select
          value={listType}
          onChange={(e) => setListType(e.target.value)}
          className="MovieListDropdown"
        >
          <option value="popular">Popular</option>
          <option value="now_playing">Now Playing</option>
          <option value="top_rated">Top Rated</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      <div className="Wrapper">
      <div className="MoviesList">
      {loading ? (
        <div className="LoadingSpinner"></div>
      ) : (
        movies.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`} className="MovieItem">
            <div className={`PlaceholderText ${loadedImages.includes(movie.id) ? 'hide' : ''}`}>
              Loading Image... hold tight!
            </div>
            <img
              className="MovieImage"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              onLoad={() => setLoadedImages((prev) => [...prev, movie.id])}
            />
            <div className="MovieDetails">
              <h2>{movie.title}</h2>
            </div>
          </Link>
        ))
      )}
    </div>
    <Footer />
    </div>
    </>
  );
};

export default MoviesList;
