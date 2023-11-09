import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/MovieDetail.css"

const MovieDetail = ({ apiKey }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Movie not found");
          } else {
            throw new Error("Network response was not ok");
          }
        }

        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, apiKey]);

  if (loading) return <div className="LoadingSpinner"></div>;
  if (error) return <div>Error: {error}</div>;

  // Calculate the rating with one decimal point
  const rating = movie.vote_average.toFixed(1);

  return (
    <div className="MovieDetail">
      <Link to="/" className="backLink">
        Back to Movies
      </Link>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>

      <div>
        <strong>Release Date:</strong> {movie.release_date}
      </div>
      <div>
        <strong>Rating:</strong> {rating} &#11088; {/* Star emoji */}
      </div>
    </div>
  );
};

export default MovieDetail;

