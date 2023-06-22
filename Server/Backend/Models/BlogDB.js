const { Schema, model } = require("mongoose");

const dbSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      require: true,
    },
    // bookmarked: {
    //   type: Boolean,
    //   require: true,
    // },
    content: {
      type: String,
      require: true,
    },
    previewText: {
      type: String,
      require: true,
    },
    tags: {
      type: Array,
      require: false,
    },
    fileValue: {
      type: String,
    },
    dateAdded: {
      type: String,
    },
  },
  { timestamps: true }
);

const BlogDB = model("Blog", dbSchema);
module.exports = BlogDB;
