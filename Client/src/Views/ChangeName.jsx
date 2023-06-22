import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import "../Styles/Change.scss"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useCookies } from "react-cookie"
import { ToastContainer, toast } from 'react-toastify'



const ChangeName = () => {
  const [newName, setNewName] = useState("")
  const navigate = useNavigate()
  const [cookies, setCookies, removeCookies] = useCookies([])

  useEffect(() => {
    toast.warn("Changing your name won't change the name attached to any blog you've previously created", {
      position: "bottom-right"
    })
  }, [])

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

        }
      }
    }
    verifyUser()
  }, [cookies, navigate, removeCookies])

  const generateErrors = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });

  const handleChangeName = async () => {

    if (newName === "") {
      generateErrors("Name cannot be empty")
    }
    try {
      if (newName !== "") {
        const { data } = await axios.post("https://warmth-crud.onrender.com/updateName", {
          name: newName
        }, {
          withCredentials: true
        })
        if (data && newName !== "") {
          navigate("/User")
          console.log(newName);
        }
      }

    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className='change'>
      <h1>Update Name</h1>
      <TextField
        id="standard-helperText"
        label="Name"
        type="text"
        variant="standard"
        className='Box'
        onChange={(e) => setNewName(e.target.value)}
      />
      <span className="ChangeButton" onClick={handleChangeName}>
        Update Name
      </span>
      <ToastContainer />
    </div>
  )
}

export default ChangeName