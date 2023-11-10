import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../css/ProductionDetail.css";

const ProductionDetail = ({ apiKey }) => {
  const { companyId } = useParams();
  const [companyDetails, setCompanyDetails] = useState(null);
  const [companyMovies, setCompanyMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyDetailsAndMovies = async () => {
      try {
        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/company/${companyId}?api_key=${apiKey}`
        );

        if (!detailsResponse.ok) {
          if (detailsResponse.status === 404) {
            navigate("/404");
          } else {
            throw new Error("Network response was not ok");
          }
        }

        const detailsData = await detailsResponse.json();
        setCompanyDetails(detailsData);

        const moviesResponse = await fetch(
          `https://api.themoviedb.org/3/company/${companyId}/movies?api_key=${apiKey}`
        );

        if (!moviesResponse.ok) {
          if (moviesResponse.status === 404) {
            navigate("/404");
          } else {
            throw new Error("Network response was not ok");
          }
        }

        const moviesData = await moviesResponse.json();
        setCompanyMovies(moviesData.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetailsAndMovies();
  }, [companyId, apiKey, navigate]);

  if (loading) return <div className="LoadingSpinner"></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="ProdList">
      <Link to="/" className="backLink">
        Back to Movies
      </Link>
      <div>
        {companyDetails?.logo_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${companyDetails.logo_path}?api_key=${apiKey}`}
            alt={companyDetails.name}
          />
        )}
      </div>

      <h1>{companyDetails?.name}</h1>

      {companyDetails?.description && <p>{companyDetails.description}</p>}

      {companyDetails?.headquarters && (
        <p>
          <strong>Headquarters:</strong> {companyDetails.headquarters}
        </p>
      )}

      {companyDetails?.origin_country && (
        <p>
          <strong>Country:</strong> {companyDetails.origin_country}
        </p>
      )}

      {companyDetails?.parent_company && (
        <p>
          <strong>Parent Company:</strong>{" "}
          {companyDetails.parent_company.name}
        </p>
      )}

      {companyDetails?.homepage && (
        <a
          href={companyDetails.homepage}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Homepage
        </a>
      )}

      {companyMovies.length > 0 && (
        <>
          <h2>Movies Produced:</h2>
          <ul>
            {companyMovies.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ProductionDetail;
