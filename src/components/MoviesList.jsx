import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/MoviesList.css";

const MoviesList = ({ apiKey }) => {
  const [movies, setMovies] = useState([]);
  const [listType, setListType] = useState("popular"); // New state for list type

  // Object mapping list types to their API endpoints
  const apiEndpoints = {
    popular: "popular",
    now_playing: "now_playing",
    top_rated: "top_rated",
    upcoming: "upcoming",
  };
  const [loading, setLoading] = useState(true);

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
    <div>
      <select
        value={listType}
        onChange={(e) => setListType(e.target.value)}
        className="movie-list-dropdown"
      >
        <option value="popular">Popular</option>
        <option value="now_playing">Now Playing</option>
        <option value="top_rated">Top Rated</option>
        <option value="upcoming">Upcoming</option>
      </select>
      <div className="MoviesList">
        {loading ? (
          // Display a loading message or spinner while waiting for data
          <div className="LoadingSpinner"></div>
        ) : (
          // Display the list of movies when data is ready
          movies.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="MovieDetails">
                <h2>{movie.title}</h2>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MoviesList;
