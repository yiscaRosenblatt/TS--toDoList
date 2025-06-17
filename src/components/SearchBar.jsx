import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [company, setCompany] = useState("");
  const navigate = useNavigate(); 

  const handleSearch = () => {
    if (company.trim()) {
      navigate(`/?search=${company}`);
    }
  };

  return (
    <div className="d-flex justify-content-center gap-2 mb-3">
      <input
        type="text"
        className="form-control w-25"
        placeholder="Enter company name..."
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSearch}>search</button>
    </div>
  );
}

export default SearchBar;
