const express = require("express");
const cors = require("cors");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* =========================
   HEALTH CHECK (IMPORTANT)
========================= */
app.get("/", (req, res) => {
  res.send("SK DALAGDAG SYSTEM IS RUNNING");
});

/* =========================
   KK FORM SUBMISSION (SAFE)
   (temporary local + ready for Google Sheets)
========================= */
app.post("/submit-kk", async (req, res) => {
  try {
    const data = req.body;

    console.log("KK DATA RECEIVED:", data);

    // OPTIONAL: SEND TO GOOGLE SHEETS
    await fetch("https://script.google.com/macros/s/AKfycbwMmUZJAQTbbi2GQiC2m-BngIgPIbNBub7z355UJu_71L8MzqDQKxJVV404p5Vk6KRm/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    res.json({
      success: true,
      message: "KK form submitted successfully"
    });

  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

/* =========================
   SERVER START (DEPLOY FIX)
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("SK SYSTEM RUNNING ON PORT " + PORT);
});