// const mongoose = require("")
const CollegeModel = require("../models/collegeModel")

const createCollege = async(req, res) => {
    try {
        let data = req.body

        if(Object.keys(data).length === 0){
            return res.status(400).send({ status: false, message: "Provide all fields..!!" })
        }

        if(!data.name || data.name == ""){
            return res.status(400).send({ status: false, message: "Name is required..!!" })
        }
        data.name = data.name.trim()
        const checkDuplicateName = await CollegeModel.findOne({name: data.name})
        if(checkDuplicateName){
            return res.status(400).send({ status: false, message: "Name is already used..!!" })
        }

        if(!data.fullName || data.fullName == ""){
            return res.status(400).send({ status: false, message: "Full Name is required..!!" })
        }
        data.fullName = data.fullName.trim()

        if(!data.logoLink || data.logoLink == ""){
            return res.status(400).send({ status: false, message: "Logo Link is required..!!" })
        }
        data.logoLink = data.logoLink.trim()

        const savedData = await CollegeModel.create(data)
        res.status(201).send({ status: true, message: savedData })
    } catch (error) {
        res.status(500).send({ status: false, message: error })
    }
}

module.exports.createCollege = createCollege 