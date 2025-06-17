import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import starFilled  from "../../public/star-filled.png";

function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="container py-4 text-center">
      <h4>Your favorite employees</h4>

      <div className="row justify-content-center mt-4">
        {favorites.map((user, idx) => (
          <div className="col-md-4 col-lg-3 mb-4" key={user.login.uuid}>
            <div className="card bg-info-subtle p-2 shadow-sm">
              <img src={user.picture.large} className="card-img-top" alt="avatar" />
              <div className="card-body text-start">
                <h5>{user.name.first} {user.name.last}</h5>
                <p>Age: {user.dob.age}</p>
                <p>Country: {user.location.country}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <Link
                    to={`/favs/employee?index=${idx}`}
                    className="btn btn-info text-white"
                  >
                    more info
                  </Link>
                  <img src={starFilled} style={{ width: "25px" }} alt="fav" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
