const mongoose = require("mongoose");
const userschema = new mongoose.Schema({

    fullName: {
        type : String,
        required: "A name is required"
    },
    age: {
        type : Number,
        required: "Age is required"
    },
    gender: {
        type : String,
        required: "Gender is required",
        enum: ["Male", "Female"]
    },

    parentFullName: {
        type: String,
        required: "Parent name is required"
    },
    email: {
        type : String,
        required: "Email is required"
    },
    phoneNumber: {
        type : Number,
        required: "Number is required"
    },
    username: {
        type : String,
        required: "Username is required"
    },
    password: {
        type : String,
        required: "Password is required"
    },
    cpassword: {
        type: String,
        required: "Confirm password is required"
    },
    createdDate: {
        type: Date,
        default: new Date().toJSON()
    }

})

const UserModel=  mongoose.model('users',userschema);

module.exports = UserModel;