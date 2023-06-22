import React, { useEffect, useState } from 'react'
import { ArrowUpRight, GridFour, Calculator, Car } from "phosphor-react"
import Pagination from "../Components/Pagination"
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import HashLoader from "react-spinners/HashLoader";
import axios from "axios"
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

function Main() {
  const navigate = useNavigate();
  const size = 20
  const [loading, setLoading] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [queryParams, setQueryParams] = useSearchParams({ p: 0 })
  const p = parseInt(queryParams.get("p"));
  let color = "#000"

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
    setLoading(true)
    axios.get(`http://localhost:4000/Home?p=${p}`)
      .then((response) => {
        setLoading(false)
        setBlogs(response.data)
      })
      .catch(err => {
        console.log("Client error, ", err);
      })
  }, [queryParams])

  const handleNextBlog = () => {
    if (p >= 0) {
      setQueryParams({ p: ((parseInt((queryParams.get("p")))) + 1).toString() })
    }
  }

  const handlePreviousBlog = () => {
    if (p >= 1) {
      setQueryParams({ p: ((parseInt((queryParams.get("p")))) - 1).toString() })
    } else {
      generateErrors("No previous page")
    }
  }

  const features = [
    {
      image: require("../Assets/tsks.jpeg"),
      h3: "User Experience and Interaction",
      paragraph: "This category focuses on enhancing the overall user experience by providing features like user registration, ensuring personalized interactions, well-organized categories/tags for easy content discovery, and a responsive design that adapts seamlessly to different devices."
    },

    {
      image: require("../Assets/space.jpeg"),
      h3: "Content Creation and Management:",
      paragraph: "Content creation and management are crucial aspects of a blog website. This category encompasses features such as the ability to create new posts, edit existing ones, delete unwanted content, and efficiently organize posts into relevant categories and tags for better content management and navigation."
    }
  ]

  const moreFeatures = [
    {
      icon: (< GridFour className='featureIcons' size={50} />),
      h3: "Customisable Layout",
      paragraph: "Users can personalize the blog's appearance.",
    },

    {
      icon: (< Calculator className='featureIcons' size={50} />),
      h3: "Nutrition Tracking",
      paragraph: "A nutrition tracking feature enables users to log their daily food intake, track calories, monitor macronutrient consumption, and maintain a healthy diet.",
    },

    {
      icon: (< Car className='featureIcons' size={50} />),
      h3: "Recipe Integration",
      paragraph: "Recipe Integration allows users to seamlessly add and edit recipes, including ingredients, instructions, and images, enhancing the blog's culinary offerings.",
    },
    {
      h3: "10+ Pages",
      paragraph: "To get started on the offerings of this blog.",
      button: (<motion.button whileHover={{ scale: 1.1 }} onClick={() => navigate("/Signup")}>Let's get started!</motion.button>)
    },
  ]

  return (
    <>
      <div className="features-Container" >
        <div data-aos="fade-up" data-aos-duration="1000">
          <div>
            <h3 className='feature-h3' id='Features'>FEATURES</h3>
            <h2 className='feature-h2'>Streamline your blog planning process</h2>
            <p className='feature-p'>
              A feature-rich blog website which offers user registration, post creation, editing, and deletion, organized categories/tags, and responsive design for optimal user experience. </p>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-duration="1000">
          {features.map((feature, i) => (
            <div key={i}>
              <img src={feature.image} alt={feature.h3} />
              <h3>{feature.h3}</h3>
              <p>
                {feature.paragraph}
              </p>
            </div>
          ))
          }
        </div>

        <div data-aos="fade-up" data-aos-duration="1000">
          <div>
            <h3 className='feature-h3'>MORE FEATURES</h3>
            <h2 className='feature-h2'>Take control of your blog planning and nutrition journey </h2>
            <p className='feature-p'>In addition to the mentioned features, the blog website offers advanced functionalities including search functionality for easy content discovery, user profile customization, and visitor engagement and performance tracking.</p>
          </div>
        </div>


        <div data-aos="fade-up" data-aos-duration="1000">
          {moreFeatures.map((morefeature, i) => (
            <div>
              {morefeature.icon}
              <h3>{morefeature.h3}</h3>
              <p>{morefeature.paragraph}</p>
              {morefeature.button}
            </div>
          ))}
        </div>


        <div data-aos="zoom-in" data-aos-duration="1000">
          <div >
            <h3 className='feature-h3' id='Blogs' >SPOTLIGHT BLOGS</h3>
            <h2 className='feature-h2'>This is what our customers have to say about this blog</h2>
          </div>
        </div>

      </div>

      {loading ?
        <HashLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        :
        <main className='main-Container' >
          {
            blogs.map((blog, i) => (
              <div className="blog" key={i}>
                <section className="image-Section" dangerouslySetInnerHTML={{ __html: blog.fileValue }}></section>
                <span className="blog-Author">
                  <p>{blog.author}</p>.
                  <p>{blog.dateAdded}</p>
                </span>
                <span className="blog-Topic">
                  <h2>{blog.topic}</h2>
                  <Link to={`/Blog/${blog._id}`} style={{ all: "unset" }} >
                    <ArrowUpRight size={size} className="arrow" />
                  </Link>
                </span>
                <p className="blog-Intro">
                  {blog.previewText}
                </p>
                <span className="tags">
                  {
                    blog.tags.map((tag, i) => (
                      <span className='tag' key={i}> {tag} </span>
                    ))
                  }
                </span>
              </div>
            ))
          }
        </main>
      }
      <Pagination handlePreviousBlog={handlePreviousBlog} handleNextBlog={handleNextBlog} />
      <ToastContainer />
    </>
  )
}

export default Main