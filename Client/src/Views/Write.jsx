import React, { useState, useEffect } from 'react'
import "../Styles/Write.scss"
import * as reactToastify from 'react-toastify'
import TextField from '@mui/material/TextField';
import { useCookies } from "react-cookie"
import { useNavigate, Link } from 'react-router-dom';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "axios"
import { Fingerprint, UserCircle } from "phosphor-react"
import { NavLink } from 'react-router-dom';

const Write = () => {
    const navigate = useNavigate()

    const Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const date = new Date()
    const dateAdded = `${date.getDate()} ${Month[date.getMonth()]}, ${date.getFullYear()}`


    const [tags, setTags] = useState([])
    const [blogTags, setBlogTags] = useState(["Books", "Money", "History", "Coding", "Education", "Programming", "Technology", "Writing", "Relationship", "Politics", "Productivity", "Anxiety", "Aging", "Freedom", "Failure", "Love", "ChatGPT", "Metaverse", "Apple", "Google", "Debt", "Cities", "Tourism", "Economy", "Ethics", "Inflation", "Comics", "Media", "Twitter", "Society", "World", "Culture", "Startups", "Freelancing", "Children", "Coaching", "Diseases", "Journaling", "Discrimination"])


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
                const { data } = await axios.post("https://warmth-crud.onrender.com", {}, { withCredentials: true });
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



    const author = userDetails.userName;
    const [content, setContent] = useState("")
    const [fileValue, setFileValue] = useState("")
    const [blogDetails, setBlogDetails] = useState({
        topic: "",
        previewText: "",
        // bookmarked: false,
    })

    const handleAddTag = (tag) => {
        if (tags.includes(tag)) {
            setTags(tags.filter((item) => item !== tag));
        } else {
            if (tags.length <= 2) {
                setTags([...tags, tag]);
            }
        }
    }






    const handleCreateBlog = async () => {
        if (blogDetails.topic !== "" && blogDetails.previewText !== "") {
            try {
                axios
                    .post('https://warmth-crud.onrender.com/Write',
                        { author, ...blogDetails, content, tags, fileValue, dateAdded })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });

            } catch (error) {
                console.log(error);
            }
            navigate("/Dashboard")

        } else {
            reactToastify.toast.error("Fields cannot be empty", {
                position: "bottom-right",
            })
        }

    }



    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
            ["link", "image"],
            ["clean"],
        ],
    };

    const imgModule = {
        toolbar: [
            ["image"],
        ],
    };


    return (
        <div className='write-Container'>
            <div className="inner-Write-Container">
                <nav>
                    <span className="nav-Left">
                        <NavLink to="/AllBlogs">
                            <Fingerprint size={32} className="logo" />
                        </NavLink>
                        <p>
                            Draft in {userDetails.userName}
                        </p>
                    </span>
                    <span className="nav-Right">
                        <span onClick={handleCreateBlog}>
                            <Link className="publish" to="/Dashboard">
                                Publish
                            </Link>
                        </span>
                        <NavLink to="/User">
                            <UserCircle size={27} />
                        </NavLink>
                    </span>
                </nav>
                <main>
                    <div>
                        <input type="text" placeholder='Blog Topic' onChange={(e) => { setBlogDetails(prev => { return { ...prev, topic: e.target.value } }) }} />
                        <section>
                            <ReactQuill theme="snow" modules={imgModule} onChange={setFileValue} placeholder='add preview image' />
                        </section>
                        <section >
                            <label >Content</label>
                            <ReactQuill modules={modules} className='textarea' theme="snow" onChange={setContent} placeholder='begin your writing journey...' />
                        </section>
                        <section className="preview-Text">
                            <span>Preview Text (brief intro about your blog)</span>
                            <textarea onChange={(e) => { setBlogDetails(prev => { return { ...prev, previewText: e.target.value } }) }}></textarea>
                        </section>
                    </div>

                    <aside className="tags">
                        <div className="content">
                            <h3>Recommended topics</h3>
                            <div className="tag">
                                {
                                    blogTags.map((tag, i) => (
                                        <span className={tags.includes(tag) ? "add t" : "t"} onClick={() => handleAddTag(tag)} key={i}> {tag} </span>
                                    ))
                                }
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
            <reactToastify.ToastContainer />
        </div>
    );
}

export default Write