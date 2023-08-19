const bcrypt = require("bcrypt");
const UserModel = require("../models/users");
const createToken = require("../utilities/createToken");
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
    return res.status(401).json({ message: "Authentication failed" });
    }

    const token = createToken(user._id);
    res
      .status(200)
      .send({
        responseCode: "00",
        responseMessage: "Login successful",
        data: {
          _id: user._id,
          fullName: user.fullName,
          age: user.age,
          gender: user.gender,
          parentFullName: user.parentFullName,
          email: user.email,
          password: user.password,
          username: user.username,
          phoneNumber: user.phoneNumber,
          createdDate: user.createdDate,
          token
        },
      });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
    console.log(error)
  }
};

module.exports = { login };
