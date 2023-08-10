const UserModel = require("../Models/UserModel");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const maxTime = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxTime,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "incorrect Email") {
    errors.email = "Email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.email = "Password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email already in use";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};


module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const User = await UserModel.create({ email, password });

    const token = createToken(User._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxTime: maxTime * 1000,
    });

    res.status(201).json({ User: User._id, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res, next) => {
  try {

    const { email, password } = req.body;
    const User = await UserModel.login(email, password);

    const token = createToken(User._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxTime: maxTime * 1000,
      sameSite: "None",
      secure: true,
    });

    
  
    res.status(200).json({ User: User._id, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};
