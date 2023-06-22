const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  name: {
    type: String,
  },

  password: {
    type: String,
    required: [true, "password is required"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect Email");
};

userSchema.statics.changePassword = async function (
  currentPassword,
  newPassword,
  email
) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(currentPassword, user.password);
    if (auth) {
      const salt = await bcrypt.genSalt();
      newPassword = await bcrypt.hash(newPassword, salt);
      return newPassword;
    } else {
      console.log("incorrect password:");
      throw Error("incorrect current password");
    }
  }
  console.log("Invalid Email");
  throw Error("Invalid Email");
};

module.exports = mongoose.model("Users", userSchema);
