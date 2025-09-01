import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { name, address, city, state, contact, image, email_id } = req.body;

  const sql = `INSERT INTO schools (name, address, city, state, contact, image, email_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, address, city, state, contact, image, email_id], (err, result) => {
    if (err) {
      console.error("Error inserting school:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "School added successfully", id: result.insertId });
  });
});

export default router;
