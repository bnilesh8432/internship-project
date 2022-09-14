const InternModel = require("../models/internModel")
const CollegeModel = require("../models/collegeModel")
const { isValid,isValidEmail,isValidMobile} = require("../validation/validation")

const createIntern = async (req, res) => {
    try {
        const data = req.body;
        if(Object.keys(data).length === 0){
            return res.status(400).send({ status: false, message: "Provide all fields..!!" })
        }

        if(!isValid(data.name)){
            return res.status(400).send({ status: false, message: "Name is required..!!" })
        }
        data.name = data.name.trim()

        if(!isValid(data.email)){
            return res.status(400).send({ status: false, message: "Email is required..!!" })
        }
        data.email = data.email.trim()
        if(!isValidEmail(data.email)){
            return res.status(400).send({ status: false, message: "Plz enter valid email..!!" })
        }
        const checkDuplicateEmail = await InternModel.findOne({email : data.email})
        if(checkDuplicateEmail){
            return res.status(400).send({ status: false, message: "Email is already exist..!!" })
        }

        if(!isValid(data.mobile)){
            return res.status(400).send({ status: false, message: "Mobile No is required..!!" })
        }
        data.mobile = data.mobile.trim()
        if(!isValidMobile(data.mobile)){
            return res.status(400).send({ status: false, message: "Plz enter valid mobile no..!!" })
        }
        const checkDuplicateMobile = await InternModel.findOne({mobile : data.mobile})
        if(checkDuplicateMobile){
            return res.status(400).send({ status: false, message: "Mobile No is already exist..!!" })
        }

        if(!isValid(data.collegeName)){
            return res.status(400).send({ status: false, message: "College Name is required..!!" })
        }
        data.collegeName = data.collegeName.trim()

        const checkCollege = await CollegeModel.findOne({$or : [{name : data.collegeName },{fullName : data.collegeName}]})

        if(!checkCollege){
            return res.status(404).send({ status: false, message: "College Name is not found..!!" })
        }

        data.collegeId = checkCollege['_id'];

        const saveData = await InternModel.create(data);
        return res.status(201).send({ status: true, data: saveData })
    } catch (error) {
        res.status(500).send({ status: false, msg: error })
    }
}

module.exports.createIntern = createIntern 