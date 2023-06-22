import React from 'react'
import { Copyright, CaretDoubleDown } from "phosphor-react"
import { useNavigate } from 'react-router-dom'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const Accordions = [
  {
    ariaControls: "panel1a-content",
    id: "panel1a-header",
    theme: "What is Warmth?",
    text: "Warmth is a versatile and user-friendly tool that helps you organize and manage different kinds of information in one place. It's like a digital notebook where you can write notes, create to-do lists, plan projects, and even collaborate with others. It's a great way to keep everything important in your life organized and easily accessible."
  },
  {
    ariaControls: "panel2a-content",
    id: "panel2a-header",
    theme: "Who is it for?",
    text: "It is designed for individuals seeking an efficient and organized way to write and track their blogs, regardless of their article preferences or goals."
  },
  {
    ariaControls: "panel3a-content",
    id: "panel3a-header",
    theme: "Do I need to pay to use Warmth?",
    text: "No, Warmth is a free app"
  },
  {
    ariaControls: "panel4a-content",
    id: "panel4a-header",
    theme: "How can I ask more questions",
    text: "Send me a message on Twitter or Insta",
  },

]

function Footer() {
  const navigate = useNavigate()
  const handleHomeAddBlog = () => {
    navigate("/Login")
  }
  return (
    <>
      <div className="accordion" data-aos="zoom-in" data-aos-duration="1500" >
        <div>
          <div >
            <h3 className='feature-h3' id="FAQs">FAQs</h3>
            <h2 className='feature-h2'>Here are the answers to the most frequently asked questions</h2>
          </div>
        </div>
        <div>
          {
            Accordions.map((accordion, i) => (
              <Accordion className='Accordion' key={i}>
                <AccordionSummary
                  expandIcon={<CaretDoubleDown />}
                  aria-controls={accordion.ariaControls}
                  id={accordion.id}
                >
                  <Typography className='Typography'>{accordion.theme}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className='Typography-Text'>
                    {accordion.text}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          }
        </div>
      </div>

      <footer className='footer-Container'>
        <div className="great-Container">
          <h2>Lets get started on something great</h2>
          <h3>Join over 400+ startups already growing with Warmth.</h3>
          <span className='button' onClick={handleHomeAddBlog}>
            Add a new blog to Warmth
          </span>
        </div>
        <div className="all-Rights-Container">
          <div>
            <div>
              <h3> Warmth </h3>
              <span className="rights-Reserved">
                <span><Copyright size={20} /></span>
                <small>{new Date().getFullYear()}. All rights reserved</small>
              </span>
              <p>A template by Wisdom Ahuzi</p>
            </div>
            <div>
              <h3>Template</h3>
              <p><a href="#Features">Features</a></p>
              <p><a href="#Blogs">Blogs</a></p>
              <p><a href="#FAQs">FAQs</a></p>
            </div>
            <div>
              <h3>Contact</h3>
              <p><a href="https://twitter.com/ahuzi_wisdom" target='_blank'>Twitter</a></p>
              <p><a href="https://www.instagram.com/ahuziwisdom/" target='_blank'>Instagram</a></p>
              <p><a href="https://github.com/Wisdom-Ahuzi" target='_blank'>Github</a></p>
            </div>
          </div>


        </div>
      </footer>
    </>
  )
}

export default Footer




