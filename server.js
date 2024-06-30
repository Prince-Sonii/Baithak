const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors"); // Import cors module
const path = require("path");
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SQLite database connection
const db = new sqlite3.Database("./database.db");

// Initialize the database schema
db.serialize(() => {
  // Create users table if not exists
  db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);
});
// login page
app.get("/css/loginPage.css",(req,res)=>{
  res.sendFile(path.join(__dirname, "loginPage.css"));
})
app.get("/image",(req,res)=>{
  res.sendFile(path.join(__dirname, "/images/building_image2.jpg"));
})
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"loginPage.html"));
})
app.get("/js/loginPage.js",(req,res)=>{
  res.sendFile(path.join(__dirname,"loginPage.js"));
})
app.get("/index.html",(req,res)=>{
  res.sendFile(path.join(__dirname,"index.html"));
})
app.get("/css/indexStyle.css",(req,res)=>{
  res.sendFile(path.join(__dirname,"indexStyle.css"));
})


// Endpoint for user registration
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  // Check if username already exists
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send({ message: "Internal server error" });
    } else if (row) {
      res.status(400).send({ message: "User already exists" });
    } else {
      // Insert new user
      db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password],
        (err) => {
          if (err) {
            console.error(err.message);
            res.status(500).send({ message: "Internal server error" });
          } else {
            res.status(201).send({ message: "Registration successful" });
          }
        }
      );
    }
  });
});

// Endpoint for user login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Check if username and password match
  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send({ message: "Internal server error" });
      } else if (row) {
        res.status(200).send({ message: "Login successful" });
      } else {
        res.status(401).send({ message: "Invalid credentials" });
      }
    }
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
