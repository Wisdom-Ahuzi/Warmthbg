import React, { useEffect, useState } from 'react'
import { Fingerprint } from "phosphor-react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "../Styles/Name.scss"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import { useCookies } from "react-cookie"
import axios from "axios"


function Name() {
    const navigate = useNavigate()

    const [values, setValues] = useState({
        email: "",
        userName: ""
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
                    setValues(prev => {
                        return { ...prev, email: data.userMail }
                    })
                }
            }
        }
        verifyUser()
    }, [cookies, navigate, removeCookies])


    const generateErrors = (err) =>
        toast.error(err, {
            position: "bottom-right",
        });

    const handleAddName = async () => {
        try {
            const { data } = await axios.post("https://warmth-crud.onrender.com/name", {
                name: values.userName
            }, {
                withCredentials: true
            })
            if (data && values.userName !== "") {
                navigate("/AllBlogs")
            } else {
                generateErrors("Name cannot be empty")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='name-Container'>
            <div className="inner-Name-Container">
                <div className="logo-Cont">
                    <Fingerprint className='finger' size={32} />
                    <h1>Warmth</h1>
                </div>
                <div className="almost-Cont">
                    <span className="almost-Header">
                        <h2>Almost there!</h2>
                        <p>Finish creating your account for the full Warmth experience.</p>
                    </span>

                    <span className="full-Name">
                        <span className='full'>Full Name</span>
                        <Box component="form" className='box-Como' sx={{ '& .MuiTextField-root': { width: '25ch' } }} noValidate autoComplete="off">
                            <TextField
                                id="standard-helperText"
                                onChange={(e) => {
                                    setValues(prev => {
                                        return { ...prev, userName: e.target.value }
                                    })
                                }}
                                label="Name"
                                type="text"
                                variant="standard"
                                className='input'
                            />
                        </Box>
                        <span className='mail-Add'>Email Address</span>
                        <p>{values.email}</p>
                        <div className="creating-Account" onClick={handleAddName}>
                            Create account
                        </div>
                    </span>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Name