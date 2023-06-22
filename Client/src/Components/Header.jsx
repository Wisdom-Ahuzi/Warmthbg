import React from 'react'
import "../Styles/Header.scss"
import { Wind } from "phosphor-react"
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
function Header() {
  return (
    <>
      <header className='header-Container'>
        <div className="inner-Header" data-aos="fade-up" data-aos-duration="1000">
          <div className="intro-Header" >
            <h3>The blog</h3>
            <h1>Writings from our team <Wind className='wind' size={34} /></h1>
            <h4>The latest industry news, interviews, technologies and resources.</h4>
          </div>
          <div className="image-Container">
            <img src={require("../Assets/image.jpg")} alt="Blog winner" />
            <div className="image-Details">
              <span className='name'>
                Olivia Rhyne . 20 Jan, 2022.
              </span>
              <span className="presentation">
                <h2>UX review presentations</h2>
              </span>
              <span className="presentation-Text">
                <p>How do you create compelling presentations that wow your colleagues and impress your managers?</p>
              </span>
              <span className="tags">
                <span className="tag">Products</span>
                <span className="tag">Research</span>
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header