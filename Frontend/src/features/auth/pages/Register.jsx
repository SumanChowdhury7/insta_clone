import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router' 
import axios from 'axios'

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleFormSubmit = async(e)=>{
    e.preventDefault()

   await axios.post("http://localhost:3000/api/auth/register",{
      username,
      email,
      password
    },
  {
    withCredentials: true
  })
    .then(res =>{
      console.log(res.data)
    })
  }


  return (


    <main>
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleFormSubmit}>
          <input
          onInput={(e)=>{setUsername(e.target.value)}}
          type="text" 
          name='username' 
          placeholder='Enter your username' />

          <input
          onInput={(e)=>{setEmail(e.target.value)}}
          type="email" 
          name='email' 
          placeholder='Enter your email' />

          <input
          onInput={(e)=>{setPassword(e.target.value)}}
          type="password" 
          name='password' 
          placeholder='Enter your password' />

          <button>Register</button>
        </form>
        <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register