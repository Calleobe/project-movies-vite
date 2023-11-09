import { Link } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';
import "../css/404.css"

const NotFound = () => {
    return (
      <div className="NotFound">
        <FaExclamationCircle className="NotFoundIcon" />
        <h2>Ooops! The movie requested was not found!</h2>
        <p>The requested page could not be found. Please check the URL or go back to the homepage.</p>
        <Link to="/" className="backLink">
            Back to Movies
        </Link>
      </div>
    );
  };
  
  export default NotFound;