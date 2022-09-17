// const mongoose = require("")
const CollegeModel = require("../models/collegeModel")
const InternModel = require("../models/internModel")
const {isValid, isValidName,isValidCollegeName,isValidLogoLink} = require("../validation/validation")

const createCollege = async (req, res) => {
    try {
        let data = req.body

        if (Object.keys(data).length === 0) {
            return res.status(400).send({
                status: false,
                message: "Provide all fields..!!"
            })
        }

        if (!isValid(data.name)) {
            return res.status(400).send({
                status: false,
                message: "Name is required..!!"
            })
        }
        data.name = data.name.trim()
        if (!isValidName(data.name)) {
            return res.status(400).send({
                status: false,
                message: "Name should be string..!!"
            })
        }

        const checkDuplicateName = await CollegeModel.findOne({
            name: data.name
        })
        if (checkDuplicateName) {
            return res.status(400).send({
                status: false,
                message: "Name is already used..!!"
            })
        }

        if (!isValid(data.fullName)) {
            return res.status(400).send({
                status: false,
                message: "Full Name is required..!!"
            })
        }
        data.fullName = data.fullName.trim()
        if (!isValidCollegeName(data.fullName)) {
            return res.status(400).send({
                status: false,
                message: "plz use only alphabates and special characters likes(,.'-) in full name..!!"
            })
        }

        if (!isValid(data.logoLink)) {
            return res.status(400).send({
                status: false,
                message: "Logo Link is required..!!"
            })
        }
        data.logoLink = data.logoLink.trim()

        if(!isValidLogoLink(data.logoLink)) {
            return res.status(400).send({
                status: false,
                message: "Plz enter valid LogoLink..!!"
            })
        }

        const savedData = await CollegeModel.create(data)
        return res.status(201).send({
            status: true,
            data: savedData
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

const collegeDetails = async function(req, res) {
    try {
        let collegeName = req.query.collegeName

        if(!collegeName){
            return res.status(400).send({
                status: false,
                message: "Plz enter College Name..!!"
            })
        }

        var findCollege = await CollegeModel.findOne({
            name: collegeName,
            isDeleted: false
        }).select({
            name: 1,
            fullName: 1,
            logoLink: 1
        })

        if (!findCollege) {
            return res.status(404).send({
                status: false,
                message: "No such college"
            })
        }

        let interns = await InternModel.find({
            collegeId: findCollege["_id"],
            isDeleted: false
        }).select({
            name: 1,
            email: 1,
            mobile: 1,
            _id: 1
        })

        if (interns.length < 1) {
            return res.status(404).send({
                status: false,
                message: "no intern applied for this college"
            })
        }
        //findCollege['interns'] = "interns"
        //console.log(findCollege)

        let details = {
            name: findCollege.name,
            fullName: findCollege.fullName,
            logoLink: findCollege.logoLink,
            interns: interns
        }

        return res.status(200).send({
            status: true,
            data: details
        })

    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails