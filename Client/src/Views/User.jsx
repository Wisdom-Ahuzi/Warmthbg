import React, { useEffect } from 'react'
import "../Styles/User.scss"
import { Fingerprint, CaretCircleLeft, ArrowRight, DotsThreeOutline } from "phosphor-react"
import { useCookies } from "react-cookie"
import { NavLink, useNavigate, Link } from 'react-router-dom'
import axios from "axios"
import { useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
function User() {
    const size = 26

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({
        userName: "",
        userEmail: ""
    })

    const [cookies, setCookies, removeCookies] = useCookies([])

    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {
                navigate("/login")
            } else {
                const { data } = await axios.post("http://localhost:4000", {}, { withCredentials: true });
                if (!data.status) {
                    removeCookies("jwt")
                    navigate("/login")
                }
                else {
                    setUserDetails(prev => {
                        return { ...prev, userEmail: data.userMail, userName: data.user }
                    })
                }
            }
        }
        verifyUser()
    }, [cookies, navigate, removeCookies])

    const handleSignOut = () => {
        removeCookies("jwt")
        navigate("/")
    }

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <main className='user-Container'>
            <div className="inner-User-Container">
                <nav>
                    <span className="logo-Container">
                        <NavLink to="/AllBlogs">
                            <Fingerprint size={33} />
                        </NavLink>
                        <h3>Warmth Account</h3>
                    </span>
                    <span onClick={handleSignOut}>
                        <Link to="/" className="signout-Container">
                            Sign out
                        </Link>
                    </span>
                </nav>
                <section className="user-Details" data-aos="zoom-in" data-aos-duration="1000">
                    <section className="left-Container">
                        <div className="my-Account">
                            <span onClick={handleBack}>
                                <CaretCircleLeft size={32} weight="duotone" />
                            </span>
                            <h3>My Account</h3>
                        </div>
                        <div className="profile">
                            <img src={require("../Assets/image.jpg")} alt="User" width={100} height={100} />
                            <span className="name-mail">
                                <h4>{userDetails.userName}</h4>
                                <small>{userDetails.userEmail}</small>
                            </span>
                        </div>
                        <div className="edit-Profile">
                            <span>
                                <span>
                                    <p>Name</p>
                                    <p>{userDetails.userName}</p>
                                </span>
                                <span >
                                    <NavLink to="/ChangeName">
                                        Edit
                                    </NavLink>
                                </span>
                            </span>
                            <span>
                                <span>
                                    <p>Email</p>
                                    <p>{userDetails.userEmail}</p>
                                </span>
                                <span>
                                    <NavLink to="/ChangeEmail">
                                        Edit
                                    </NavLink>
                                </span>
                            </span>
                            <span >
                                <span>
                                    <p>Password</p>
                                    <DotsThreeOutline size={32} weight="duotone" />
                                </span>
                                <span>
                                    <NavLink to="/ChangePassword">
                                        Change
                                    </NavLink>
                                </span>
                            </span>
                        </div>
                        <div className="developer">
                            <div>
                                <span>
                                    <p>Developer</p>
                                    <p>Wisdom</p>
                                </span>
                                <span>
                                    <p>see github</p>
                                </span>
                            </div>
                            <div>
                                <a href="https://ahuziwisdom.vercel.app">
                                    <p>Visit the developer </p><ArrowRight className='arrow' size={23} />
                                </a>
                            </div>
                        </div>
                        <span>
                            <p onClick={handleSignOut}>
                                <Link to="/" >
                                    Sign out
                                </Link>
                            </p>
                        </span>
                    </section>
                </section>
            </div>
        </main>
    )
}

export default User