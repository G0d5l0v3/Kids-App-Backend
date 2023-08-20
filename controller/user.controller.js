const Joi = require("joi");
const UserModel = require("../models/users");
const bcrypt = require("bcrypt")

const signup = async (req, res) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).required(),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    parentFullName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    password: Joi.string().min(8).required(),
    cpassword: Joi.string().valid(Joi.ref("password")).required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      responseCode: "80",
      responseMessage: error.details[0].message,
      data: null,
    });
  }
  const {
    fullName,
    age,
    gender,
    parentFullName,
    email,
    password,
    cpassword,
    username,
    phoneNumber,
  } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).send({
        responseCode: "80",
        responseMessage: "email already exists",
        data: null,
      });
    }
    //hashing the password with 2^n algorithm
    const salt = await bcrypt.genSalt(10);

    user = new UserModel({
      fullName,
      age,
      gender,
      parentFullName,
      email,
      password,
      cpassword,
      username,
      phoneNumber,
      createdDate: new Date().toJSON(),
    });
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();
    res.status(200).send({
      responseCode: "00",
      responseMessage: "User created successfully",
      data: {
        _id: user._id,
        fullName,
        age,
        gender,
        parentFullName,
        email,
        username,
        phoneNumber,
        createdDate: user.createdDate
      },
    });
  } catch (error) {
    res.status(500).send({
      responseCode: "90",
      responseMessage: error.message,
      data: null,
    });
  }
};
module.exports = signup;
