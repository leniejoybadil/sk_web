const express = require("express");
const cors = require("cors");
const multer = require("multer");
const XLSX = require("xlsx");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

let dataStore = [];

// file upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// SUBMIT DATA
app.post("/submit", upload.single("validID"), (req, res) => {
  const data = {
    fullname: req.body.fullname,
    contact: req.body.contact,
    email: req.body.email,
    address: req.body.address,
    event: req.body.event || "",
    purok: req.body.purok || "",
    file: req.file ? req.file.filename : null
  };

  dataStore.push(data);

  res.send("Saved Successfully");
});

// EXPORT EXCEL
app.get("/export", (req, res) => {
  const ws = XLSX.utils.json_to_sheet(dataStore);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "KK Data");

  const filePath = "kk_data.xlsx";
  XLSX.writeFile(wb, filePath);

  res.download(filePath);
});

// START SERVER
app.listen(3000, () => {
  console.log("SK Backend running on port 3000");
});