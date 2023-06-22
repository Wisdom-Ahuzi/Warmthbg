import React, { useState } from 'react'
import { Fingerprint } from "phosphor-react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import "../Styles/Login.scss"
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios"

import { NavLink, useNavigate } from "react-router-dom"

import { Eye, EyeClosed } from "phosphor-react"
function Login() {

  const size = 22

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: ""
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const generateErrors = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("https://warmth-crud.onrender.com/login", {
        ...details,
      }, {
        withCredentials: true
      })

      // console.log(data);

      if (data) {
        if (data.errors) {
          const { email, password } = data.errors
          if (email) {
            generateErrors(email)
            // console.log(password);
          } else if (password) {
            generateErrors(password)
          }
        } else {
          navigate("/AllBlogs")
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='login-Container'>
      <div className="log">
        <div className="inner-Log">
          <div className="icon-Finger">
            <NavLink to="/">
              <Fingerprint className='finger' size={34} />
            </NavLink>
            <p>Warmth</p>
          </div>
          <div className="login-Container">
            <span className="span">
              <h3>Log in</h3>
              <span className="new-">
                <small>New to Warmth?</small>
                <NavLink to="/Signup">
                  Sign up for free
                </NavLink>
              </span>
            </span>
            <span className="login-Details">

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
                className='input'
              />
              <Box className='box' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl className='input-two' sx={{ width: '25ch' }} variant="standard" >
                  <InputLabel htmlFor="standard-adornment-password" className='label'>Password</InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    className='input '
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
            </span>
            <span className="login-Button" onClick={handleLoginSubmit}>
              <p>Log in</p>
            </span>
          </div>
          <div className="botton-Text">
            English (Nigeria)
          </div>
        </div>
      </div>
      <div className="img">
        <img src={require("../Assets/cup.jpg")} alt="Sign up " />
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login