import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/MoviesList.css'

const MoviesList = ({ apiKey }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
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
  }, [apiKey]);
  

  return (
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
  );
};

export default MoviesList;
