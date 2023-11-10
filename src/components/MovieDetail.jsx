import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import useNavigate
import "../css/MovieDetail.css";

const MovieDetail = ({ apiKey }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );

        if (!response.ok) {
          if (response.status === 404) {
            navigate("/404");
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

  <div className="production-companies">
    {movie?.production_companies?.map((company) => (
      <Link key={company.id} to={`/production/${company.id}`}>
        {company.name}
      </Link>
    ))}
  </div>;
  return (
    <div className="MovieDetail">
      <Link to="/" className="backLink">
        Back to Movies
      </Link>

      <h1>{movie?.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`}
        alt={movie?.title}
      />
      <p>{movie?.overview}</p>

      <div>
        <strong>Release Date:</strong> {movie?.release_date}
      </div>
      <div>
        <strong>Rating:</strong> {rating} &#11088; {/* Star emoji */}
      </div>

      <div className="production-companies">
        <strong>Production companies:</strong>
        <div className="production-pills">
          {movie?.production_companies?.map((company) => (
            <Link key={company.id} to={`/production/${company.id}`} className="production-pill">
              {company.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
