const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// ✅ Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Projects API
app.get("/projects", (req, res) => {
  res.json([
    { id: 1, name: "Clean and Green Program" },
    { id: 2, name: "Youth Leadership Training" },
    { id: 3, name: "Sports League Tournament" }
  ]);
});

// ✅ Events API
app.get("/events", (req, res) => {
  res.json([
    { id: 1, title: "Climate Change Seminar" },
    { id: 2, title: "Youth Day Celebration" }
  ]);
});

// ✅ Server Port (IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});