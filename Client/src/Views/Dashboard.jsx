import React, { useEffect, useState } from 'react'
import "../Styles/Dashboard.scss"
import { Fingerprint, UserCircle, Plus } from "phosphor-react"
import { useCookies } from "react-cookie"
import { NavLink, useNavigate, Link } from 'react-router-dom'
import axios from "axios"
import HashLoader from "react-spinners/HashLoader";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

function Dashboard() {
    const navigate = useNavigate()
    const size = 30
    const [myBlog, setMyBlog] = useState([])
    const [loading, setLoading] = useState(false)
    const [cookies, setCookies, removeCookies] = useCookies([])

    const override = {
        display: "block",
        margin: "0 auto",
        width: "100%",
        height: "60vh"
    };

    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {
                navigate("/login")
            } else {
                const { data } = await axios.post("https://warmth-crud.onrender.com", {}, { withCredentials: true });
                if (!data.status) {
                    removeCookies("jwt")
                    navigate("/login")
                }
            }
        }
        verifyUser()
    }, [cookies, navigate, removeCookies])



    useEffect(() => {
        setLoading(true)
        axios.get("https://warmth-crud.onrender.com/Dashboard")
            .then((response) => {
                setLoading(false)
                setMyBlog(response.data)
            })
            .catch(err => {
                console.log("Client error, ", err);
            })
    }, [])


    const handleWrite = () => {
        navigate("/Write")
    }

    const handleEditPage = () => {
        navigate("/EditBlog")
    }

    const Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = new Date()
    const dateAdded = `${date.getDate()} ${Month[date.getMonth()]}, ${date.getFullYear()}`
    return (
        <main className='dashboard-Container'>
            <div className="inner-dashboard-Container">
                <nav>
                    <span className="logo-Container">
                        <NavLink to="/AllBlogs">
                            <Fingerprint className='logo' size={33} />
                        </NavLink>
                        <h3>Warmth Account</h3>
                    </span>
                    <NavLink to="/User" title="Account">
                        <UserCircle className='user' size={size} />
                    </NavLink>
                </nav>
                <section className="dashboard-Details">
                    <section className="right-Container" data-aos="fade-up" data-aos-duration="1000">
                        <div className="heading">
                            <h1>Your Blogs</h1>
                            <p>Manage your reading list and so on and so forth. I hopes this works bro.</p>
                        </div>


                        {
                            loading ?
                                <HashLoader
                                    color={"#000"}
                                    loading={loading}
                                    cssOverride={override}
                                    size={30}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                                :
                                <div className="your-Blogs">
                                    <div className="my-Blog" onClick={handleWrite}>
                                        <span>
                                            <Plus size={size} color='white' />
                                        </span>
                                        <h3>Add a new Blog</h3>
                                        <p>{dateAdded}</p>
                                    </div>
                                    {myBlog.map((blog, i) => (
                                        <Link className="my-Blog" to={`/EditBlog/${blog._id}`} key={i}>
                                            <div className="my-Blog one" onClick={handleEditPage}>
                                                <div dangerouslySetInnerHTML={{ __html: blog.fileValue }}></div>
                                                <h3>{blog.topic}</h3>
                                                <p>{blog.dateAdded}.</p>
                                            </div>
                                        </Link>
                                    ))}

                                </div>
                        }
                    </section>
                </section>
            </div>
        </main>
    )
}

export default Dashboard