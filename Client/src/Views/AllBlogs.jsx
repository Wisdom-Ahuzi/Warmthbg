import React, { useEffect, useState, CSSProperties } from 'react'
import "../Styles/AllBlogs.scss"
import { Fingerprint, MagnifyingGlass, Bookmarks, StarFour, UserCircle, SquaresFour } from "phosphor-react"
import { NavLink, Link, useSearchParams } from 'react-router-dom'
import axios from "axios"
import { useCookies } from "react-cookie"
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from "phosphor-react"
import { ToastContainer, toast } from 'react-toastify'
import HashLoader from "react-spinners/HashLoader";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const AllBlogs = () => {

    const [queryParams, setQueryParams] = useSearchParams({ p: 0 })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [individualBlog, setIndividualBlog] = useState([])
    const [cookies, setCookies, removeCookies] = useCookies([])
    const [search, setSearch] = useState("")
    const p = parseInt(queryParams.get("p"));

    const override = {
        display: "block",
        margin: "0 auto",
        width: "100%",
        height: "70vh"
    };

    const generateErrors = (err) =>
        toast.info(err, {
            position: "bottom-right",
        });

    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {
                navigate("/login")
            } else {
                const { data } = await axios.post("https://warmth-crud.onrender.com/", {}, { withCredentials: true });
                if (!data.status) {
                    removeCookies("jwt")
                    navigate("/login")
                }
            }
        }
        verifyUser()
    }, [cookies, navigate, removeCookies])

    useEffect(() => {
        let source = axios.CancelToken.source();
        let config = { cancelToken: source.token }
        setLoading(true)
        if (p >= 0) {
            axios.get(`https://warmth-crud.onrender.com/AllBlogs?p=${p}`, config)
                .then((response) => {
                    setLoading(false)
                    setIndividualBlog(response.data)
                })
                .catch(err => {
                    if (axios.isCancel(err)) {
                        console.log("The allblogs request got cancelled");
                    } else {
                        console.log(`server error ${err.message}`);
                    }
                })
        } else {
            console.log("The query parameter is invalid");
        }

        return () => {
            source.cancel();
            console.log("AllBlogs component unmounted");
        }
    }, [queryParams])

    useEffect(() => {
        axios.post("https://warmth-crud.onrender.com/DashboardAuthUser", {
            cookies
        })
            .then((response) => {
                console.log("Successfully sent dashboardauthUser cookies to server", response);
            })
            .catch(err => {
                console.log("Client error, ", err.response.data);
            })
    }, [])

    const handleNextBlog = () => {
        setAciveIndex(0);
        if (p >= 0) {
            setQueryParams({ p: ((parseInt((queryParams.get("p")))) + 1).toString() })
        }
    }

    const [activeIndex, setAciveIndex] = useState(0);

    const handlePreviousBlog = () => {
        setAciveIndex(0);
        if (p >= 1) {
            setQueryParams({ p: ((parseInt((queryParams.get("p")))) - 1).toString() })
        } else {
            generateErrors("No previous page")
        }
    }

    const categories = ["Foryou", "Books", "Money", "History", "Coding", "Education", "Programming", "Technology", "Writing", "Relationship", "Politics", "Productivity", "Anxiety", "Aging", "Freedom", "Failure", "Love", "ChatGPT", "Metaverse", "Apple", "Google", "Debt", "Cities", "Tourism", "Economy", "Ethics", "Inflation", "Comics", "Media", "Twitter", "Society", "World", "Culture", "Startups", "Freelancing", "Children", "Coaching", "Diseases", "Journaling", "Discrimination"]
    const size = 28

    const handleNewCategory = (category, i) => {
        setAciveIndex(i);
        const categoryItem = category
        if (category === "Foryou") {
            try {
                setLoading(true)
                axios.get(`https://warmth-crud.onrender.com/AllBlogs`)
                    .then((response) => {
                        setLoading(false)
                        setIndividualBlog(response.data)
                    })
            } catch (error) {
                if (error.response) {
                    console.log(error.response);
                    console.log("server responded");
                } else if (error.request) {
                    console.log("network error");
                } else {
                    console.log(error);
                }
            }
        } else {
            try {
                axios.post("https://warmth-crud.onrender.com/BlogCategory", { categoryItem })
                    .then((response) => {
                        try {
                            setLoading(true)
                            axios.get("https://warmth-crud.onrender.com/BlogGetCategory")
                                .then((response) => {
                                    setLoading(false)
                                    setIndividualBlog(response.data)
                                })
                        } catch (error) {
                            if (error.response) {
                                console.log(error.response);
                                console.log("server responded");
                            } else if (error.request) {
                                console.log("network error");
                            } else {
                                console.log(error);
                            }
                        }
                    })
            } catch (error) {
                if (error.response) {
                    console.log(error.response);
                    console.log("server responded");
                } else if (error.request) {
                    console.log("network error");
                } else {
                    console.log(error);
                }
            }
        }


    }


    return (
        <div className='allblogs-Container'>
            <div className="nav">
                <nav>
                    <span className="left-Nav">
                        <NavLink to="/AllBlogs">
                            <Fingerprint className='logo' size={40} />
                        </NavLink>
                        <span className="search">
                            <MagnifyingGlass className='glass' size={20} />
                            <input type="search" onChange={e => setSearch(e.target.value)} placeholder='Search Warmth' />
                        </span>
                    </span>

                    <span className="right-Nav">
                        <div className="write">
                            <NavLink to="/Dashboard" title="dashboard" className="write">
                                <SquaresFour className='log' size={size} />
                            </NavLink>
                        </div>
                        {/* <NavLink to="/Bookmarks" title='Saved Blogs'>
                            <Bookmarks className='user' size={size} />
                        </NavLink> */}

                        <NavLink to="/User" title="Account">
                            <UserCircle className='log' size={size} />
                        </NavLink>
                    </span>
                </nav>
            </div>

            <main>
                <div className="main">
                    <span className="for-You">
                        <div>
                            {
                                categories.map((category, i) => (
                                    <p key={i} onClick={() => handleNewCategory(category, i)} className={i === activeIndex ? "true" : ""}>{category}</p>
                                ))
                            }
                        </div>
                    </span>
                    {loading ?
                        <HashLoader
                            // color={"#000"}
                            loading={loading}
                            cssOverride={override}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        :
                        <div className="all-Blogs" data-aos="fade-up" data-aos-duration="1000">
                            {
                                individualBlog.filter(item => {
                                    return search.toLowerCase() === ""
                                        ? item
                                        : item.topic.toLowerCase().includes(search);
                                }).map((blog, i) => (
                                    <div className="individual-Blog" key={i}  >
                                        <section className='content-Section'>
                                            <div className="writer-details">
                                                <h4> {blog.author} </h4>
                                                <p> {blog.dateAdded} </p>
                                                <span> <StarFour size={10} color="orange" /> member only </span>
                                            </div>
                                            <div className="header-Content">
                                                <Link to={`/Blog/${blog._id}`}>
                                                    <h2>
                                                        {blog.topic}
                                                    </h2>
                                                </Link>
                                                <p>
                                                    {blog.previewText}
                                                </p>
                                            </div>
                                            <div className="tags">
                                                {blog.tags.map((tag, i) => (
                                                    <span className="tag" key={i}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>
                                        <section className="image-Section" dangerouslySetInnerHTML={{ __html: blog.fileValue }}>
                                        </section>

                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
            </main>

            <div className='pagination-Container'>
                <span className="previous" onClick={handlePreviousBlog}>
                    <ArrowLeft className='arr' size={size} />
                    Previous
                </span>
                <span className="next" onClick={handleNextBlog}>
                    Next
                    <ArrowRight className='arr' size={size} />
                </span>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AllBlogs