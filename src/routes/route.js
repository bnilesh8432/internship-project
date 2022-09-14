const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")

//College
router.post("/colleges", collegeController.createCollege) //Create College
router.get("/collegeDetails", collegeController.collegeDetails) //College Details

//Intern
router.post("/interns", internController.createIntern) //Create Intern                                                         


module.exports = router;