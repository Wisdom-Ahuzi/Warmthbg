import "./Styles/App.scss";
import ChangePassword from "./Views/ChangePassword";
import { Route, Routes } from "react-router-dom"
import ChangeEmail from "./Views/ChangeEmail";
import ChangeName from "./Views/ChangeName";
import User from "./Views/User";
import AllBlogs from "./Views/AllBlogs";
import Write from "./Views/Write";
import Name from "./Views/Name";
import Home from "./Views/Home";
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Views/Dashboard";
import EditBlog from "./Views/EditBlog";
import Blog from "./Views/Blog";
// import Mybookmarks from "./Views/Mybookmarks";
import Notfound from "./Views/Notfound";

function App() {
  return (
    <div className="App-container">
      <Routes>
        <Route path="*" element={<Notfound />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Name" element={<Name />}></Route>
        <Route path="/AllBlogs" element={<AllBlogs />}></Route>
        <Route path="/Blog/:blogId" element={<Blog />}></Route>
        {/* <Route path="/Bookmarks" element={<Mybookmarks />}></Route> */}
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/Write" element={<Write />}></Route>
        <Route path="/EditBlog/:editBlogId" element={<EditBlog />}></Route>
        <Route path="/User" element={<User />}></Route>
        <Route path="/ChangeName" element={<ChangeName />}></Route>
        <Route path="/ChangeEmail" element={<ChangeEmail />}></Route>
        <Route path="/ChangePassword" element={<ChangePassword />}></Route>
      </Routes>
    </div>
  );
}

export default App;
