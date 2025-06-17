import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import EmployeeCard from "../components/EmployeeCard";
import SearchBar from "../components/SearchBar";
import { useFavorites } from "../context/FavoritesContext";

function HomePage() {
  const [employees, setEmployees] = useState([]);
  const location = useLocation();
  const { isFavorite, toggleFavorite } = useFavorites();

  const getQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("search");
  };

  const query = getQuery();

  const fetchEmployees = async () => {
    const url = `https://randomuser.me/api/?results=10&seed=${query || "google"}`;
    try {
      const res = await axios.get(url);
      setEmployees(res.data.results);
    } catch {
      alert("API Error");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [location.search]);

  return (
    <div className="container py-4 text-center">
      <SearchBar />

      <h4 className="mb-4">
        {query
          ? <>Search for employees of <b>{query.toUpperCase()}</b></>
          : <>employees :</>}
      </h4>

      <div className="row justify-content-center">
        {employees.map((user, idx) => (
          <div className="col-md-4 col-lg-3 mb-4" key={idx}>
            <EmployeeCard
              user={user}
              index={idx}
              company={query || "google"}
              isFavorite={isFavorite(user)}
              toggleFavorite={() => toggleFavorite(user)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
