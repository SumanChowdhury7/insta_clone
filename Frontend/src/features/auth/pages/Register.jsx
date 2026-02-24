import React, { useState } from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router' 
import { useAuth } from "../hooks/useAuth"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {handleRegister, loading} = useAuth()
  const navigate = useNavigate();

  if(loading){
    return (
      <main>
      <h2>Loading....</h2>
      </main>
    )
  }

  const handleFormSubmit = async(e)=>{
    e.preventDefault()

   await handleRegister(username,email,password)
    .then(res=>{
    console.log(res)
    navigate("/Login");
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