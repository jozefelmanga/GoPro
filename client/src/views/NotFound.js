import React from 'react'
import "../login.css";
import error from "../img/404.png"

function NotFound() {
  return (
    <div className='fullscreen'>
        <img src={error} alt="error" id='notfound' />
    </div>
  )
}

export default NotFound