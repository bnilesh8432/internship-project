const InternModel = require("../models/internModel")

const createIntern = async (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        res.status(500).send({ status: false, msg: error })
    }
}

module.exports.createIntern = createIntern 