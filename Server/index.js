const express = require("express");
const BlogDB = require("./Backend/Models/BlogDB");
const BookmarkDB = require("./Backend/Models/BookmarkDB");
const UserModal = require("./Auth/Models/UserModel");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const authRoutes = require("./Auth/Routes/AuthRoutes");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 4000;
const app = express();
let token;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((e) => {
    console.log(e.message);
  });

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(
  express.json({
    limit: 20000000,
  })
);

app.get("/Home", (req, res) => {
  const page = req.query.p || 0;
  const blogsPerPage = 6;

  BlogDB.find()
    .sort({ createdAt: -1 })
    .skip(page * blogsPerPage)
    .limit(6)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("Errors:", err);
    });
});

app.get("/AllBlogs", (req, res) => {
  const page = req.query.p || 0;
  const blogsPerPage = 10;

  BlogDB.find()
    .sort({ createdAt: -1 })
    .skip(page * blogsPerPage)
    .limit(10)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("Errors:", err);
    });
});

let catItem;

app.post("/BlogCategory", (req, res) => {
  catItem = req.body.categoryItem;
  res.send("Successfully Posted Category")
});

app.get("/BlogGetCategory", (req,res) => {
  if (catItem != undefined) {
    const page = req.query.p || 0;
    const blogsPerPage = 10;

    BlogDB.find({tags:catItem})
      .sort({ createdAt: -1 })
      .skip(page * blogsPerPage)
      .limit(10)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log("Errors:", err);
      });
  }else{
    console.log("Has not reflected");
  }

})


app.get("/Blog/:id", (req, res) => {
  const id = req.params.id;
  BlogDB.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/EditBlog/:id", (req, res) => {
  const id = req.params.id;
  BlogDB.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/updateBlog/:id", (req, res) => {
  const updates = {
    topic: req.body.updateTopic,
    fileValue: req.body.updateDisplayImg,
    content: req.body.updateContent,
    previewText: req.body.updatePreviewText,
    tags:req.body.editTags,
  };
  const id = req.params.id;
  BlogDB.findByIdAndUpdate(id, { $set: updates })
    .then(() => {
      console.log("Successfully updated Blog");
    })
    .catch((err) => {
      console.log("Error updating blog", err);
    });
});

app.delete("/DeleteBlog/:id", (req, res) => {
  const blogId = req.params.id;

  BlogDB.findByIdAndDelete(blogId)
    .then((result) => {
      console.log("Successfully deleted blog");
    })
    .catch((err) => {
      console.log("Delete Blog error", err);
    });
});


// let blogidcard;

// app.post("/BookmarksAuthUser", (req, res) => {
//   const blogID = req.body.blogID
//   if (token) {
//     jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
//       if (err) {
//         console.log("Error in jwt verify");
//       } else {
//         const user = await UserModal.findById(decodedToken.id);
//         if (user) {
//           const userID = user._id
//           const bookm = new BookmarkDB({userID,blogID});
//           bookm
//             .save()
//             .then((result) => {
//               console.log("successfully bookmarked a new blog");
//             })
//             .catch((err) => {
//               console.log("error bookmarking new blog:", err);
//             });
//             blogidcard = bookm._id
//         } else {
//           console.log("User not found");
//         }
//       }
//     });
//   } else {
//     console.log("There seems to be no token");
//   }
// });

// app.post("/BookmarksAuthUserDel", (req,res) => {
//   const blogID = req.body.blogID
//   BookmarkDB.findByIdAndDelete(blogidcard)
//     .then((result) => {
//       console.log("Successfully removed blog from bookmarks - ");
//     })
//     .catch(err => {
//       console.log("Unable to delete blog - ", err);
//     })
// })

// app.get("/Bookmarks", (req,res) => {
//   // const blogDataSent = []
//   // if (token) {
//   //   jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
//   //     if (err) {
//   //       console.log("Error in jwt verify");
//   //     } else {
//   //       const user = await UserModal.findById(decodedToken.id);
//   //       if (user) {
//   //         BookmarkDB
//   //           .find({userID:user._id})
//   //           .then(result => {
//   //             result.map(item => (
//   //               BlogDB.find({_id:item.blogID})
//   //                 .then(stuff => {
//   //                     blogDataSent.push(stuff)
//   //                     res.json(blogDataSent)
//   //                 })
//   //                 .catch(err => {
//   //                   // console.log("Error finding bookmark blogs");
//   //                 })
//   //             ))
              
//   //           })
//   //           .catch(err => {
//   //             console.log("Blog bookmark error,", err);
//   //           })
//   //       } else {
//   //         console.log("User not found in Bookmarks");
//   //       }
//   //     }
//   //   });
//   // } else {
//   //   console.log("There seems to be no token in Bookmarks");
//   // }
// })

app.post("/Write", (req, res) => {
  const blog = new BlogDB(req.body);
  blog
    .save()
    .then((result) => {
      console.log("successfully added a new blog");

    })
    .then((err) => {
      console.log("error adding new blog:", err);
    });
});

// app.post("/BookmarkBlog", (req, res) => {
//   jwt.verify(
//     req.body.userId,
//     process.env.SECRET_KEY,
//     async (err, decodedToken) => {
//       if (err) {
//         console.log("Error at bookmark blog");
//       } else {
//         req.body.userId = decodedToken.id;

//         const blog = new BookmarkDB(req.body);
//         blog
//           .save()
//           .then((result) => {
//             console.log("successfully added a new blog");
//           })
//           .then((err) => {
//             console.log("error adding new blog:", err);
//           });
//       }
//     }
//   );

//   // const { bookmark, blogId } = req.body;
//   // const updateBookmark = { bookmarked: bookmark };
//   // BlogDB.findByIdAndUpdate(blogId, { $set: updateBookmark })
//   //   .then((result) => {})
//   //   .catch((err) => {
//   //     console.log("Update Error", err);
//   //   });
// });

app.post("/DashboardAuthUser", (req, res) => {
  token = req.body.cookies.jwt;
});

app.get("/Dashboard", (req, res) => {
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log("Error in jwt verify");
      } else {
        const user = await UserModal.findById(decodedToken.id);
        if (user) {
          BlogDB.find({ author: user.name })
            .then((result) => {
              res.json(result);
            })
            .catch((err) => {
              console.log("Bookmark error,", err);
            });
        } else {
          console.log("User not found");
        }
      }
    });
  } else {
    console.log("There seems to be no token");
  }
});

app.use(cookieParser());
app.use("/", authRoutes);
