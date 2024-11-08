const express = require("express");
const router = express.Router();
const tutorials = require("../controllers/controller");


router.post("/", tutorials.create);
router.get("/", tutorials.getAll);

module.exports = router;
