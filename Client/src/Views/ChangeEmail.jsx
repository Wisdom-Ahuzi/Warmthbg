import React,{useEffect,useState} from 'react'
import TextField from '@mui/material/TextField';
import "../Styles/Change.scss"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import {useCookies} from "react-cookie"
import {ToastContainer, toast} from 'react-toastify'


const ChangeEmail = () => {
  const navigate = useNavigate()
  const [newMail, setNewMail] = useState("")
  const [cookies,setCookies,removeCookies] = useCookies([])

    useEffect(() => {
        const verifyUser = async () => {
        if (!cookies.jwt) {
            navigate("/login")
        }else{
            const {data} = await axios.post("http://localhost:4000",{}, {withCredentials:true});
            if(!data.status){
                removeCookies("jwt")
                navigate("/login")
            }
            else {}
        }
        }
        verifyUser()
    }, [cookies,navigate,removeCookies])

  const generateErrors = (err) => 
    toast.error(err, {
    position:"bottom-right",
  });

  const handleChangeEmail = async () => {
    if (newMail === "") {
      generateErrors("Email cannot be empty")
    }
      try {
      if (newMail!== "") {
        const { data } = await axios.post("http://localhost:4000/updateMail", {
          mail:newMail
        }, {
          withCredentials:true 
        })
        if(data && newMail !== ""){         
          navigate("/User")
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='change'>
        <h1>Update Email</h1>
         
        <TextField
            id="standard-helperText"
            label="Email"
            placeholder='Enter new email'
            type="email"
            variant="standard"
            className='Box'
            onChange={(e) => setNewMail(e.target.value)}
        />

        <span className="ChangeButton" onClick={handleChangeEmail}>
            Update Email
        </span>
        <ToastContainer/>
    </div>
  )
}

export default ChangeEmail