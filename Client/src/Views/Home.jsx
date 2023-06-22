import React from 'react'
import Navbar from "../Components/Navbar"
import Header from "../Components/Header"
import Main from "../Components/Main"
import Footer from "../Components/Footer"
import "../Styles/Home.scss"
const Home = () => {
  return (
    <div className='Home-container'>
        <Navbar/>
        <Header/>
        <Main/>
        <Footer/>
    </div>
  )
}

export default Home