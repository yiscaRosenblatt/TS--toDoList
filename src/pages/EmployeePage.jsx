import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import starFilled  from "../../public/star-filled.png";
import starEmpty  from "../../public/star-empty.png";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

function EmployeePage() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const params = new URLSearchParams(location.search);
  const company = params.get("company") || "google";
  const index = parseInt(params.get("index"));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://randomuser.me/api/?results=10&seed=${company}`);
        const data = await res.json();
        setUser(data.results[index]);
      } catch {
        alert("Failed to fetch user data.");
      }
    };
    fetchUser();
  }, [company, index]);

  if (!user) return <div className="text-center mt-5">Loading...</div>;

  const lat = parseFloat(user.location.coordinates.latitude);
  const lng = parseFloat(user.location.coordinates.longitude);
  const fav = isFavorite(user);

  return (
    <div className="container text-center py-4">
      <h4>Info about: <b>{user.name.first} {user.name.last}</b></h4>
      <img src={user.picture.large} className="my-3 rounded" alt="avatar" />
      <p><b>Age:</b> {user.dob.age}</p>
      <p><b>Country:</b> {user.location.country}</p>
      <p>
        <b>Address:</b> {user.location.street.name} {user.location.street.number},{" "}
        {user.location.city}, {user.location.state}, {user.location.country},{" "}
        {user.location.postcode}
      </p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>

      <img
        src={fav ? starFilled : starEmpty}
        style={{ width: "30px", cursor: "pointer" }}
        alt="star"
        className="my-2"
        onClick={() => toggleFavorite(user)}
      />

      <div className="mt-4" style={{ height: "300px" }}>
        <MapContainer center={[lat, lng]} zoom={8} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={[lat, lng]}>
            <Popup>{user.name.first} {user.name.last}'s location</Popup>
          </Marker>
        </MapContainer>
      </div>

      <button className="btn btn-primary mt-4" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default EmployeePage;
