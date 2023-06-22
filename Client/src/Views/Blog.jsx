import React, { useEffect, useState } from 'react'
import "../Styles/Blog.scss"
import { Fingerprint, StarFour, UserCircle, SquaresFour } from "phosphor-react"
import { NavLink, useParams } from 'react-router-dom'
import axios from "axios"
// import { useNavigate } from 'react-router-dom';
// import { useCookies } from "react-cookie"
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer } from 'react-toastify'

function Blog() {
    const { blogId } = useParams()
    const [loading, setLoading] = useState(false)
    const size = 28

    // const [userDetails, setUserDetails] = useState({
    //     userName: "",
    //     userEmail: ""
    // })


    const override = {
        display: "block",
        margin: "0 auto",
        width: "100%",
        height: "70vh"
    };

    const [blogInfo, setBlogInfo] = useState({})
    // const [cookies, setCookies, removeCookies] = useCookies([])




    useEffect(() => {
        let source = axios.CancelToken.source();
        let config = { cancelToken: source.token }
        setLoading(true)
        axios.get(`http://localhost:4000/Blog/${blogId}`, config)
            .then((response) => {
                setLoading(false)
                setBlogInfo(response.data)
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log("The blog request got cancelled");
                } else {
                    console.log(`server error ${err.message}`);
                }
            })

        return () => {
            source.cancel();
            console.log("Blog component unmounted");
        }
    }, [])


    // const topic = blogInfo.topic
    // const author = blogInfo.author
    // const content = blogInfo.content
    // const previewText = blogInfo.previewText
    // const tags = blogInfo.tags
    // const fileValue = blogInfo.fileValue
    // const dateAdded = blogInfo.dateAdded



    // const [bookmarkstate, setBookmarkstate] = useState(false)
    // const blogID = blogInfo._id

    // const handleBookmarked = () => {
    //     if (!cookies.jwt) {
    //         toast.error(("Sorry, must have an account to bookmark"), {
    //             position: "top-right",
    //         });
    //     } else {
    //         try {
    //             if (bookmarkstate === false) {
    //                 axios.post("http://localhost:4000/BookmarksAuthUser", {
    //                     blogID
    //                 }).then(response => {
    //                     console.log("Updated the bookmarked state:", response.data);
    //                 })
    //             } else {
    //                 axios.post("http://localhost:4000/BookmarksAuthUserDel", {
    //                     blogID
    //                 }).then(response => {
    //                     console.log("Updated the bookmarked state:", response.data);
    //                 })
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }

    //         toast.success((blogInfo.bookmarked ? "Removed from bookmarks, refresh to confirm" : "Added to bookmarks, refresh to confirm"), {
    //             position: "top-right",
    //         });
    //     }

    //     setBookmarkstate(current => !current)


    // }


    return (
        <>
            <div className='blog-Container'>
                <div className="nav">
                    <nav>
                        <span className="left-Nav">
                            <NavLink to="/AllBlogs">
                                <Fingerprint className='logo' size={40} />
                            </NavLink>

                        </span>

                        <span className="right-Nav">
                            <div className="write">
                                <NavLink to="/Dashboard" title="dashboard" className="write">
                                    <SquaresFour className='user' size={size} />
                                </NavLink>
                            </div>
                            {/* <NavLink to="/Bookmarks" title='Saved Blogs'>
                                <Bookmarks className='user' size={size} />
                            </NavLink> */}

                            <NavLink to="/User" title="Account">
                                <UserCircle className='user' size={size} />
                            </NavLink>
                        </span>
                    </nav>
                </div>

                {loading ?
                    <HashLoader
                        color={"#000"}
                        loading={loading}
                        cssOverride={override}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /> :
                    <main >
                        <h1>
                            {blogInfo.topic}
                        </h1>
                        <span>
                            <img src={require("../Assets/image.jpg")} alt="Blog Author" />
                            <span>
                                <p>
                                    {blogInfo.author}
                                </p>
                                <span>
                                    <p>{blogInfo.dateAdded}</p>
                                    <span><StarFour size={10} color="orange" />Member - only</span>
                                    <span style={{ cursor: "pointer" }} ></span>
                                </span>
                            </span>
                        </span>
                        <div className="blog-items" dangerouslySetInnerHTML={{ __html: blogInfo.fileValue }}></div>
                        <div className="blog-items" dangerouslySetInnerHTML={{ __html: blogInfo.content }}>
                        </div>
                    </main>}
            </div>
            <ToastContainer />
        </>
    )
}

export default Blog