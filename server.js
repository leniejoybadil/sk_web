const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/projects", (req, res) => {
  res.json([
    { id: 1, name: "Clean and Green Program" },
    { id: 2, name: "Youth Leadership Training" },
    { id: 3, name: "Sports League Tournament" }
  ]);
});

app.get("/events", (req, res) => {
  res.json([
    { id: 1, title: "Climate Change Seminar" },
    { id: 2, title: "Youth Day Celebration" }
  ]);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});