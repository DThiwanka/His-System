const express = require("express");
const router = express.Router();
const doctors = require("../controllers/controller");

router.get("/", doctors.getAll);
router.post("/add", doctors.create);
router.put("/update/:id", doctors.update); 
router.get("/:id", doctors.findOne);  
router.delete("/delete/:id", doctors.delete);

module.exports = router;
