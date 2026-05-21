import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js"

const app = express();

const PORT = process.env.PORT || 5000;

// Get file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
// Get the directory name from the file path
const __dirname = dirname(__filename);

// Middleware
// This line allows express to parse JSON data from incoming request bodies
app.use(express.json());
// This line allows express to parse URL-encoded data from incoming request bodies
app.use(express.urlencoded({ extended: true }));
// Serving up the html file from the /public directory
// Tell express to serve all files from the public folder as static assets / files. Any requests for the css files will be resolved to the public directory
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Routes
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
