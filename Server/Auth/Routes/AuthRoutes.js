const User = require("../Models/UserModel");
const { register, login } = require("../Controllers/AuthControllers");
const {
  checkUser,
  withAuth,
  updateName,
  updateMail,
  updatePassword,
} = require("../Middlewares/Authmiddlewares");

const router = require("express").Router();
//Auth Routes
router.post("/", checkUser);

router.post("/register", register);

router.post("/login", login);

router.post("/name", withAuth, async (req, res) => {
  req.user = req.body.name;
  const UserID = req.userId;
  const Name = req.user;
  const update = { name: Name };
  User.findByIdAndUpdate(UserID, { $set: update })
    .then(() => {
      console.log("Success");
    })
    .catch((err) => {
      console.log(err, "Could not update document");
    });
  res.json({ status: true });
});

router.post("/updateName", updateName, async (req, res) => {
  req.user = req.body.name;
  const UserID = req.userId;
  const Name = req.user;
  const update = { name: Name };
  User.findByIdAndUpdate(UserID, { $set: update })
    .then(() => {
      console.log("Success");
    })
    .catch((err) => {
      console.log(err, "Could not update document");
    });

  res.json({ status: true });
});

router.post("/updateMail", updateMail, async (req, res) => {
  req.user = req.body.mail;
  const UserID = req.userId;
  const Mail = req.user;
  const update = { email: Mail };
  User.findByIdAndUpdate(UserID, { $set: update })
    .then(() => {
      console.log("Success");
    })
    .catch((err) => {
      console.log(err, "Could not update document");
    });

  res.json({ status: true });
});

router.post("/updatePassword", updatePassword, async (req, res) => {
  req.user = req.body.password;
  const UserID = req.userId;
  const Password = req.password;
  const update = { password: Password };
  User.findByIdAndUpdate(UserID, { $set: update })
    .then(() => {
      console.log("Success");
    })
    .catch((err) => {
      console.log(err, "Could not update document");
    });
  res.json({ status: true });
});

//Blog Routes
module.exports = router;
