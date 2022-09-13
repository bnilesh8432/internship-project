const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const InternSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email should be unique"]
    },
    mobile: {
        type: String,
        required: [true, "Mobile no. is required"],
        unique: [true, "Mobile no. should be unique"]
    },
    collegeId: {
        type: ObjectId,
        ref: "College",
        required: [true, "College Id is required"],
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
module.exports = mongoose.model('Intern', InternSchema)