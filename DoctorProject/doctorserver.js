const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());


const datarouter = require('./routes/routes');


app.use("/doctor", datarouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
