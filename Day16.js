const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const connectionString = "mongodb://127.0.0.1/mydatabase"; // Corrected the typo here

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connection Error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send(
    "<h2>Connected to MongoDB Successfully</h2>",
  );
});

app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});