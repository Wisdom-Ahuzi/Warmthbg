const UserModal = require("../Models/UserModel");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await UserModal.findById(decodedToken.id);

        if (user)
          res.json({ status: true, userMail: user.email, user: user.name });
        else res.json({ status: false });
        next();
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};

module.exports.withAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await UserModal.findById(decodedToken.id);
        if (user) {
          req.user = user;
          req.userId = user._id;
          next();
        } else res.json({ status: false });
      }
    });
  } else {
    res.json({ status: false });
  }
};

module.exports.updateName = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await UserModal.findById(decodedToken.id);
        if (user) {
          req.user = user;
          req.userId = user._id;
          next();
        } else res.json({ status: false });
      }
    });
  } else {
    res.json({ status: false });
  }
};

module.exports.updateMail = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await UserModal.findById(decodedToken.id);
        if (user) {
          req.user = user;
          req.userId = user._id;
          next();
        } else res.json({ status: false });
      }
    });
  } else {
    res.json({ status: false });
  }
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "incorrect current password") {
    errors.password = "Password is incorrect";
  }

  if (err.message === "Invalid Email") {
    errors.password = "Email is invalid";
  }

  return errors;
};

module.exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, email } = req.body;
    const User = await UserModal.changePassword(
      currentPassword,
      newPassword,
      email
    );
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          next();
        } else {
          const user = await UserModal.findById(decodedToken.id);
          if (user) {
            req.user = user;
            req.password = User;
            req.userId = user._id;
            next();
          } else res.json({ status: false });
        }
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};
