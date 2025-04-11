const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public")); // serve login.html

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const filePath = path.join(__dirname, "JSON", "login.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ success: false });

    const users = JSON.parse(data).users;
    if (users[username] && users[username].password === password) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));