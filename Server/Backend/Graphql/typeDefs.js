const { gql } = require("apollo-server-express");

module.exports = gql`
  type Blog {
    author: String
    bookmarked: Boolean
    snippet: String
    previewSnippet: String
  }

  input BlogInput {
    snippet: String
    previewSnippet: String
  }

  type Query {
    blog : (ID : ID!) : Blog!
    getBlogs : (amount: Int):[Blog]
  }

  type Mutation{
    createBlog(blogInput:BlogInput):Blog!
    deleteBlog(ID:ID!):Boolean
    editBlog(ID :ID!,blogInput: BlogInput):Boolean
  }
`;
