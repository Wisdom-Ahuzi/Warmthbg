const { Schema, model } = require("mongoose");

const dbSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    blogID: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const BookmarkDB = model("Bookmarks", dbSchema);
module.exports = BookmarkDB;
