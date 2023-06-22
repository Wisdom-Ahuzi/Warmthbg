import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie"
import axios from "axios"
import "../Styles/passwordChange.scss"
import { ToastContainer, toast } from 'react-toastify'
import { Eye, EyeClosed } from "phosphor-react"
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';


const ChangePassword = () => {
  const navigate = useNavigate()
  const size = 22

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = React.useState(false);

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    email: ""
  })

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
          setPassword(prev => {
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

  const handleChangePassword = async () => {
    if (password.currentPassword === "" || password.newPassword === "") {
      generateErrors("Fields cannot be empty")
    }
    try {
      if (password.currentPassword !== "" && password.newPassword !== "") {
        const { data } = await axios.post("http://localhost:4000/updatePassword", {
          ...password
        }, {
          withCredentials: true
        })
        if (data && password.currentPassword !== "" && password.newPassword !== "") {
          if (data.errors) {
            const { email, password } = data.errors
            if (email) {
              generateErrors(email)
              console.log(password);
            } else if (password) {
              generateErrors(password)
            }
          } else {
            navigate("/AllBlogs")
          }
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowPasswordTwo = () => setShowPasswordTwo((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPasswordTwo = (event) => {
    event.preventDefault();
  };

  return (
    <div className='change'>
      <div className="inner-Change">
        <h1>Update Password</h1>

        <div>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            className='Box Boxer'
            placeholder='Current Password'
            onChange={(e) => setPassword(prev => { return { ...prev, currentPassword: e.target.value } })}
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

          <Input
            id="standard-adornment-password"
            placeholder='New Password'
            type={showPasswordTwo ? 'text' : 'password'}
            className='Box'
            onChange={(e) => setPassword(prev => { return { ...prev, newPassword: e.target.value } })}
            endAdornment={
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordTwo}
                  onMouseDown={handleMouseDownPasswordTwo}
                >
                  {showPasswordTwo ? <Eye size={size} /> : <EyeClosed size={size} />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>

        <span className="ChangeButton" onClick={handleChangePassword}>
          Update Password
        </span>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ChangePassword