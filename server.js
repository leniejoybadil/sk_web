const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SK Website Server is running 🚀");
});

app.get("/projects", (req, res) => {
  res.json([
    { id: 1, name: "Clean and Green Program" },
    { id: 2, name: "Youth Leadership Training" }
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