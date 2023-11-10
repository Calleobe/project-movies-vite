import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MoviesList from "./components/MoviesList";
import MovieDetail from "./components/MovieDetail";
//Make a 404 page when an invalid ID is opened!
import NotFound from "./components/404";
import ProductionDetail from "./components/ProductionDetail";

function App() {
  const API_KEY = "83bb1ee925f72ad2658686f869cc1de0";
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoviesList apiKey={API_KEY} />} />
        <Route path="/movies/:id" element={<MovieDetail apiKey={API_KEY} />} />
        <Route
          path="/production/:companyId"
          element={<ProductionDetail apiKey={API_KEY}/>}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
