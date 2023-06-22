import React from 'react'
import "../Styles/Notfound.scss"
import { useNavigate } from "react-router-dom";


function Notfound() {

    const history = useNavigate()
    const handleBack = () => {
        history(-1)
    }
    return (
        <div className='notfound'>
            <img src={require("../Assets/notfound.jpg")} alt="" />
            <h3>Oh no, something went wrong!</h3>
            <p>So sorry, but it seems like you navigated to a url that does not exist.
                Click the button below to go back.
            </p>
            <button onClick={handleBack}>Go back</button>
        </div>
    )
}

export default Notfound