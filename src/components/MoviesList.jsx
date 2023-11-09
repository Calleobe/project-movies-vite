import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/MoviesList.css'

const MoviesList = ({ apiKey }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, [apiKey]);

  return (
    <div className="MoviesList">
      {movies.map((movie) => (
        <Link key={movie.id} to={`/movies/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="MovieDetails">
            <h2>{movie.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MoviesList;
