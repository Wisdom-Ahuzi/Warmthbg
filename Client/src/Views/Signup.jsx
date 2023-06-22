import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify'
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Eye, EyeClosed } from "phosphor-react"
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom"
import "../Styles/Signup.scss"



function Signup() {
    const size = 22
    const [showPassword, setShowPassword] = React.useState(false);
    const [details, setDetails] = useState({
        email: "",
        password: ""
    })
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const navigate = useNavigate();


    const generateErrors = (err) =>
        toast.error(err, {
            position: "bottom-right",
        });


    const handleSigninSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post("http://localhost:4000/register", {
                ...details,
            }, {
                withCredentials: true
            })

            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors
                    if (email) {
                        generateErrors(email)
                        console.log(password);
                    } else if (password) {
                        generateErrors(password)
                    }
                } else {
                    navigate("/Name")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='signup-Container'>
            <div className="image-Container">
                <img src={require("../Assets/cup.jpg")} alt="Sign up" />
            </div>
            <div className="welcome-Container">
                <div className="inner-Welcome">
                    <div className="welcome-Intro">
                        <div className="big-Texts">
                            <h3>Welcome to Warmth,</h3>
                            <h4>Sign up to Continue.</h4>
                        </div>
                        <div className="small-Texts">
                            <span className="already">
                                <p>Already have an account?</p>
                                <NavLink to="/Login" className="login-Signup">
                                    Log in
                                </NavLink>
                            </span>
                            <p>It takes less than a minute</p>
                        </div>
                    </div>
                    <div className="signup-Mail">
                        <TextField
                            id="standard-helperText"
                            label="Email"
                            type="email"
                            onChange={(e) => {
                                setDetails(prev => {
                                    return { ...prev, email: e.target.value }
                                })
                            }}
                            variant="standard"
                            className='Box'
                        />
                        <Box className='Box-Container' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl className='Box' sx={{ width: '25ch' }} variant="standard" onSubmit={e => handleSigninSubmit(e)}>
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => {
                                        setDetails(prev => {
                                            return { ...prev, password: e.target.value }
                                        })
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end" >
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Eye size={size} /> : <EyeClosed size={size} />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Box>
                        <div className="signup-Button" onClick={handleSigninSubmit}>
                            <p>Sign up</p>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Signup