import React from 'react'
import "../Styles/Navbar.scss"
import { Fingerprint } from "phosphor-react"
import { Link } from "react-router-dom"

function Navbar() {
  const size = 42
  return (
    <nav className='navbar-Container'>
      <div className="navbar-Desktop">
        <span className="warmth-Icon">
          <Fingerprint className='finger' size={size} />
          <p className="icon">warmth</p>
        </span>
        <span className="account-Container">
          {/* <Link to="/Login" className="log-In">
            Log in
          </Link> */}
          <a href="#Blogs">Blogs</a>
          <a href="#FAQs">FAQs</a>

          <Link to="/Signup" className="sign-Up">
            Sign up
          </Link>
        </span>
      </div>
      <div className="navbar-Mobile">

      </div>
    </nav>
  )
}

export default Navbar