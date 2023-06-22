const BlogDB = require("../Models/BlogDB");

module.exports = {
  Query: {
    async blog(_, { ID }) {
      return await BlogDB.findById(ID);
    },
    async getBlogs(_, { amount }) {
      return await BlogDB.find().sort().limit(amount);
    },
  },

  Mutation: {
    async createBlog(_, { blogInput: { snippet, previewSnippet } }) {
      const createdBlog = new BlogDB({
        snippet: snippet,
        previewSnippet: previewSnippet,
      });

      const res = await createdBlog.save(); //MongoDb Saving

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteBlog(_, { ID }) {
      const wasDeleted = (await BlogDB.deleteOne({ _id: ID })).deletedCount;
      // 1 if something was deleted
      return wasDeleted;
    },

    async editBlog(_, { ID, blogInput: { snippet, previewSnippet } }) {
      const wasEdited = await BlogDB.updateOne({
        _id: ID,
        blogInput: { snippet: snippet, previewSnippet: previewSnippet },
      }).modifiedCount;

      return wasEdited;
    },
  },
};
