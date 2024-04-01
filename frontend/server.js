import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// define the port to run the server on

const PORT = process.env.PORT || 8080;

// Resolve directory paths (ES Module syntax fix)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files located in the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));

// All GET requests that don't match a static file should return the main index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
