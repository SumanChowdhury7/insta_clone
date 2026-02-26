import React from 'react'
import '../nav.scss'
import { useNavigate } from 'react-router'



const Nav = () => {
    const navigate = useNavigate();
  return (
   <nav className="nav-bar">
    <p>Insta</p>
    <button className='button' onClick={()=>{
        navigate('/create-post')
    }
    }>New Post</button>
   </nav>
  )
}

export default Nav