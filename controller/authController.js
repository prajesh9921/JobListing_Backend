const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if ((!name, !email, !password, !phoneNumber)) {
      res.status(400).json({ message: "Bad request" });
    }

    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
    });

    await newUser
      .save()
      .then(() => {
        res.status(200).json({ message: "User created successfully" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Error creating user", error: err });
      });
  } catch (err) {
    console.log("Error Registering" + err);
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await User.findOne({ email: email });
    if (!userDetails) {
      res.status(401).json({ message: "Invalid username or password" });
    }

    const matchPassword = await bcrypt.compare(password, userDetails.password);

    if (!matchPassword) {
      res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: userDetails._id }, process.env.SECRET_KEY);

    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ message: "user login successfull", token: token });
  } catch (err) {}
};

module.exports = { RegisterUser, LoginUser };
