import { Link } from "react-router-dom";
import { useState } from "react";
import starFilled  from "../../public/star-filled.png";
import starEmpty  from "../../public/star-empty.png";


function EmployeeCard({ user, company, index, isFavorite, toggleFavorite }) {
  return (
    <div className="card shadow-sm">
      <img src={user.picture.large} className="card-img-top" alt="avatar" />
      <div className="card-body bg-light text-start">
        <h5>{user.name.first} {user.name.last}</h5>
        <p>Age: {user.dob.age}</p>
        <p>Country: {user.location.country}</p>

        <div className="d-flex justify-content-between align-items-center">
          <Link
            to={`/employee?company=${company}&index=${index}`}
            className="btn btn-info text-white"
          >
            more info
          </Link>
          <img
            src={isFavorite ? starFilled : starEmpty}
            alt="star"
            style={{ width: "25px", cursor: "pointer" }}
            onClick={toggleFavorite}
          />
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;