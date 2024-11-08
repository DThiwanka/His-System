const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Import the router
const datarouter = require('./routes/routes');

// Use the router for all `/tute` routes
app.use("/tute", datarouter);

// Set the server port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
