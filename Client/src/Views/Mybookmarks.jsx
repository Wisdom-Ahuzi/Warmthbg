// import React, { useEffect, useState } from 'react'
// import "../Styles/AllBlogs.scss"
// import { Fingerprint, MagnifyingGlass, StarFour, UserCircle, SquaresFour, BookmarkSimple } from "phosphor-react"
// import { NavLink, Link } from 'react-router-dom'
// import axios from "axios"
// import { useCookies } from "react-cookie"
// import { useNavigate } from 'react-router-dom';

// function Mybookmarks() {
//     const navigate = useNavigate()
//     const [individualBlog, setIndividualBlog] = useState([]);
//     const [cookies, setCookies, removeCookies] = useCookies([])

//     useEffect(() => {
//         const verifyUser = async () => {
//             if (!cookies.jwt) {
//                 navigate("/login")
//             } else {
//                 const { data } = await axios.post("http://localhost:4000", {}, { withCredentials: true });
//                 if (!data.status) {
//                     removeCookies("jwt")
//                     navigate("/login")
//                 }
//             }
//         }
//         verifyUser()
//     }, [cookies, navigate, removeCookies])

//     // const [dataArr, setDataArr] = useState([])

//     useEffect(() => {
//         axios.get("http://localhost:4000/Bookmarks")
//             .then((response) => {
//                 // setDataArr((prev) => [...prev, response.data])
//                 // setIndividualBlog(response.data);

//             })
//             .catch(err => {
//                 console.log("Client error, ", err);
//             })
//     }, [])

//     // console.log(dataArr);

//     // useEffect(() => {
//     //     axios.post("http://localhost:4000/BookmarksAuthUser", {
//     //         cookies
//     //     })
//     //     .then((response) => {
//     //         console.log("DashboardAuthUser",response);
//     //     })
//     //     .catch(err => {
//     //         console.log("Client error, ", err);
//     //     })
//     // },[])


//     const size = 28


//     const handleBlog = () => {
//         navigate("/Blog")
//     }
//     return (
//         <div className='allblogs-Container'>
//             <div className="nav">
//                 <nav>
//                     <span className="left-Nav">
//                         <NavLink to="/AllBlogs">
//                             <Fingerprint className='logo' size={40} />
//                         </NavLink>
//                         <span className="search">
//                             <MagnifyingGlass className='glass' size={20} />
//                             <input type="search" placeholder='Search Warmth' />
//                         </span>
//                     </span>

//                     <span className="right-Nav">
//                         <div className="write">
//                             <NavLink to="/Dashboard" title="dashboard" className="write">
//                                 <SquaresFour className='user' size={size} />
//                             </NavLink>
//                         </div>

//                         <NavLink to="/User" title="Account">
//                             <UserCircle className='user' size={size} />
//                         </NavLink>


//                     </span>
//                 </nav>
//             </div>

//             <main>
//                 <div className="main">
//                     <span className="for-You">
//                         <h3>Your Bookmarks</h3>
//                     </span>
//                     <div className="all-Blogs">
//                         {
//                             individualBlog.map((blog, i) => (
//                                 <div className="individual-Blog" key={i}>
//                                     <section className='content-Section'>
//                                         <div className="writer-details">
//                                             <h4> {blog.author} </h4>
//                                             <p> {blog.dateAdded} </p>
//                                             <span> <StarFour size={10} color="orange" /> member Only </span>
//                                         </div>
//                                         <div className="header-Content">
//                                             <Link to={`/Blog/${blog._id}`}>
//                                                 <h2>
//                                                     {blog.topic}
//                                                 </h2>
//                                             </Link>
//                                             <p>
//                                                 {blog.previewText}
//                                             </p>
//                                         </div>
//                                         <div className="tags">
//                                             {blog.tags.map((tag, i) => (
//                                                 <span className="tag" key={i}>
//                                                     {tag}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </section>
//                                     <section className="image-Section">
//                                         <div dangerouslySetInnerHTML={{ __html: blog.fileValue }}></div>
//                                     </section>
//                                 </div>
//                             ))
//                         }
//                     </div>
//                 </div>
//             </main>
//         </div>
//     )
// }

// export default Mybookmarks
