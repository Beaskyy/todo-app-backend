const express = require("express");

const app = express();

PORT = 3000;

// middleware
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

console.log("first");
