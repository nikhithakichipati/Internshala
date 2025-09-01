import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/schools")
      .then((res) => setSchools(res.data))
      .catch((err) => console.error("Error fetching schools:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-sm-center fw-bold"> Top Schools</h2>
      <div className="row g-4">
        {schools.map((school) => (
          <div key={school.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <img
                src={`http://localhost:5000/uploads/${school.image}`}
                className="card-img-top"
                alt={school.name}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-center fw-bold">{school.name}</h5>
                <p className="card-text">
                  {school.address}, {school.city}, {school.state}
                </p>
                <p className="card-text"><b>Contact:</b> {school.contact}</p>
                <p className="card-text"><b>Email:</b> {school.email_id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ShowSchools;
