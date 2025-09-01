import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function AddSchools() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email_id: ""
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in form) {
        formData.append(key, form[key]);
      }
      formData.append("image", imageFile || "");

      await axios.post("http://localhost:5000/schools", formData);

      alert("School added successfully!");
      setForm({ name: "", address: "", city: "", state: "", contact: "", email_id: "" });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add school");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add School</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input className="form-control" name="name" placeholder="School Name" value={form.name}onChange={handleChange} required/>
        </div>
        <div className="col-md-6">
          <input className="form-control" name="email_id" placeholder="Email" value={form.email_id} onChange={handleChange}/>
        </div>
        <div className="col-12">
          <input className="form-control" name="address" placeholder="Address" value={form.address} onChange={handleChange}/>
        </div>
        <div className="col-md-4">
          <input className="form-control" name="city" placeholder="City" value={form.city}  onChange={handleChange}/>
        </div>
        <div className="col-md-4">
          <input className="form-control" name="state" placeholder="State" value={form.state} onChange={handleChange}/>
        </div>
        <div className="col-md-4">
          <input className="form-control" name="contact" placeholder="Contact" value={form.contact}onChange={handleChange}/>
        </div>
        <div className="col-12">
          <input type="file" className="form-control" accept="image/*" onChange={handleFileChange}/>
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary w-10"> Add School</button>
        </div>
      </form>
    </div>
  );
}
export default AddSchools;
