// Import the Express framework
// Express is a web application framework for Node.js that makes it easier to build web applications
const express = require("express");

// Create an Express application instance
const app = express();

// Define the port number the server will listen on
// In development, it's common to use port 3000
const PORT = 3000;

// Import our custom pie model that will handle data operations
// This file should contain functions for CRUD (Create, Read, Update, Delete) operations
const piesModel = require("./piesModel");

// Middleware setup
// express.static serves static files (like HTML, CSS, images) from the "public" directory
app.use(express.static("public"));

// Parse URL-encoded bodies (as sent by HTML forms)
// Note: This should have configuration options, like { extended: true }
app.use(express.urlencoded());

// Parse JSON bodies
app.use(express.json());

// Basic Routes
// GET request to the root path ("/")
// When someone visits the homepage, they'll see this message
app.get("/", (req, res) => {
  res.send("Hello TechBridge Cohort 2! Watch Nodemon in action");
});

// POST request to the root path
// This endpoint accepts POST requests and returns a JSON response
app.post("/", (req, res) => {
  res.json({ posted: true });
});

// Pie API Routes
// Define a constant for the pie API endpoint to avoid repetition
const PIE_API_URL = "/api/pie";

// GET /api/pie
// Returns all pies in the system
app.get(PIE_API_URL, (req, res) => {
  // Read all pies from the model
  const pies = piesModel.readPies();
  // Send the pies as JSON response
  res.json({ pies });
});

// POST /api/pie
// Creates a new pie
app.post(PIE_API_URL, (req, res) => {
  // Extract the flavor from the request body
  const { flavor } = req.body;
  // Create a new pie with the given flavor
  piesModel.createPie(flavor);
  // Get the updated list of pies
  const pies = piesModel.readPies();
  // Set HTTP status to 201 (Created)
  res.status(201);
  // Send the updated list of pies
  res.json({ pies });
});

// PUT /api/pie
// Updates an existing pie
app.put(PIE_API_URL, (req, res) => {
  // Extract the current flavor and new flavor from the request body
  const { flavor, newFlavor } = req.body;
  // Update the pie
  piesModel.updatePie(flavor, newFlavor);
  // Get the updated list of pies
  const pies = piesModel.readPies();
  // Set HTTP status to 201 (Created)
  res.status(201);
  // Send the updated list of pies
  res.json({ pies });
});

// DELETE /api/pie
// Deletes a pie
app.delete(PIE_API_URL, (req, res) => {
  // Extract the flavor to delete from the request body
  const { flavor } = req.body;
  // Delete the pie
  piesModel.deletePie(flavor);
  // Get the updated list of pies
  const pies = piesModel.readPies();
  // Set HTTP status to 200 (OK)
  res.status(200);
  // Send the updated list of pies
  res.json({ pies });
});

// Start the server
// This makes the server listen for requests on the specified port
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
}); 