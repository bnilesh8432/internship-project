const CollegeModel = require("../models/collegeModel")

const createCollege = async(req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        res.status(500).send({ status: false, msg: error })
    }
}

module.exports.createCollege = createCollege 