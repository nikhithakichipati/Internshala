import express from "express";
import cors from "cors";
import mysql from "mysql2";
import multer from "multer";
import path from "path";

import db from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post("/schools", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.filename : ""; 

  const sql = `
    INSERT INTO schools (name, address, city, state, contact, image, email_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, address, city, state, contact, image, email_id], (err, result) => {
    if (err) {
      console.error(" Error inserting school:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: " School added successfully", id: result.insertId });
  });
});


app.get("/schools", (req, res) => {
  db.query("SELECT * FROM schools", (err, results) => {
    if (err) {
      console.error(" Error fetching schools:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.get("/", (req, res) => res.send("Server is running!"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
