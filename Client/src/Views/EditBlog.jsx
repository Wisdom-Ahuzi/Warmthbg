import React, { useState, useEffect } from 'react'
import "../Styles/EditBlog.scss";
import TextField from '@mui/material/TextField';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import { Fingerprint, UserCircle } from "phosphor-react"
import { NavLink } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";



function EditBlog() {
    const navigate = useNavigate()
    const { editBlogId } = useParams()
    const [editBlogInfo, setEditBlogInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [userDetailsEdit, setUserDetailsEdit] = useState({
        userName: "",
        userEmail: ""
    })

    const override = {
        display: "block",
        margin: "0 auto",
        width: "100%",
        height: "70vh"
    };

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
                    setUserDetailsEdit(prev => {
                        return { ...prev, userEmail: data.userMail, userName: data.user }
                    })
                }
            }
        }
        verifyUser()
    }, [cookies, navigate, removeCookies])

    // const [editTag, setEditTag] = useState("")
    const [editTags, setEditTags] = useState([])
    const [blogTags, setBlogTags] = useState(["Books", "Money", "History", "Coding", "Education", "Programming", "Technology", "Writing", "Relationship", "Politics", "Productivity", "Anxiety", "Aging", "Freedom", "Failure", "Love", "ChatGPT", "Metaverse", "Apple", "Google", "Debt", "Cities", "Tourism", "Economy", "Ethics", "Inflation", "Comics", "Media", "Twitter", "Society", "World", "Culture", "Startups", "Freelancing", "Children", "Coaching", "Diseases", "Journaling", "Discrimination"])


    const [fileValue, setFileValue] = useState("")
    const [editBlogDetails, setEditBlogDetails] = useState({
        topic: "",
        previewText: "",
        bookmarked: false
    })

    const [content, setContent] = useState("")


    useEffect(() => {
        let source = axios.CancelToken.source();
        let config = { CancelToken: source.token }
        setLoading(true)
        axios.get(`http://localhost:4000/EditBlog/${editBlogId}`, config)
            .then((response) => {
                setLoading(false)
                setEditBlogInfo(response.data)
                setEditBlogDetails(prev => {
                    return { ...prev, topic: response.data.topic, fileValue: response.data.fileValue, content: response.data.content, previewText: response.data.previewText }
                })
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log("The editblog request got cancelled");
                } else {
                    console.log("Client error, ", err.message);
                }
            })

        return () => {
            source.cancel();
            console.log("EditBlog component unmounted");
        }

    }, [])

    const imgModule = {
        toolbar: [
            ["image"],
        ],
    };

    const updateTopic = editBlogDetails.topic
    const updateDisplayImg = editBlogDetails.fileValue
    const updateContent = editBlogDetails.content
    const updatePreviewText = editBlogDetails.previewText


    const handleUpdateBlog = async () => {
        try {
            if (editTags.length > 0) {
                axios
                    .put(`http://localhost:4000/updateBlog/${editBlogId}`,
                        { editBlogId, updateTopic, updateDisplayImg, updateContent, updatePreviewText, editTags })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                axios
                    .put(`http://localhost:4000/updateBlog/${editBlogId}`,
                        { editBlogId, updateTopic, updateDisplayImg, updateContent, updatePreviewText })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }

        } catch (error) {
            console.log(error);
        }
        navigate("/Dashboard")
    }

    const handleDeleteBlog = () => {
        try {
            axios
                .delete(`http://localhost:4000/DeleteBlog/${editBlogId}`,
                    { editBlogId: editBlogId })
                .then(() => {
                })
                .catch(error => {
                    console.log(error);
                });

        } catch (error) {
            console.log(error);
        }
        navigate("/Dashboard")
    }

    const handleAddTag = (tag) => {
        if (editTags.includes(tag)) {
            setEditTags(editTags.filter((item) => item !== tag));
        } else {
            if (editTags.length <= 2) {
                setEditTags([...editTags, tag]);
            }
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


    return (
        <div className='edit-Container'>
            <div className="inner-edit-Container">
                <nav>
                    <span className="nav-Left">
                        <NavLink to="/Dashboard">
                            <Fingerprint size={32} className="logo" />
                        </NavLink>
                        <p>
                            Edit Draft in {userDetailsEdit.userName}
                        </p>
                    </span>
                    <span className="nav-Right">
                        <span className="publish" onClick={handleUpdateBlog}>
                            Update
                        </span>

                        <span className="delete" onClick={handleDeleteBlog}>
                            Delete
                        </span>
                        <NavLink to="/User">
                            <UserCircle size={27} />
                        </NavLink>
                    </span>
                </nav>
                {loading ?
                    <HashLoader
                        color={"#000"}
                        loading={loading}
                        cssOverride={override}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /> : <main>
                        <div>
                            <input type="text" value={editBlogDetails.topic} onChange={(e) => { setEditBlogDetails(prev => { return { ...prev, topic: e.target.value } }) }} />
                            <section>
                                <ReactQuill value={editBlogDetails.fileValue} theme="snow" modules={imgModule} onChange={setFileValue} placeholder='' />
                            </section>
                            <section>
                                <label >Content</label>
                                <ReactQuill modules={modules} className='textarea' theme="snow" onChange={setContent} placeholder='' value={editBlogDetails.content} />
                            </section>
                            <section className="preview-Text">
                                <span>Edit Preview Text (Not more than 25 words)</span>
                                <textarea value={editBlogDetails.previewText} onChange={(e) => { setEditBlogDetails(prev => { return { ...prev, previewText: e.target.value } }) }} >
                                </textarea>
                            </section>
                        </div>

                        <aside className="tags">
                            <div className="content">
                                <h3>Recommended topics</h3>
                                <div className="tag">
                                    {
                                        blogTags.map((tag, i) => (
                                            <span className={editTags.includes(tag) ? "add t" : "t"} onClick={() => handleAddTag(tag)} key={i}> {tag} </span>
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                                <h3>Blog topics</h3>
                                <div>
                                    {
                                        editBlogInfo.tags && (
                                            editBlogInfo.tags.map((item, i) => (
                                                <span key={i} className='t'>{item}</span>
                                            ))
                                        )
                                    }
                                </div>
                            </div>
                        </aside>
                    </main>
                }
            </div>
        </div>
    )
}

export default EditBlog