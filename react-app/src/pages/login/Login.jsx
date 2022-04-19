import './login.css'

import { useContext, useRef } from 'react'
import axios from 'axios'

import { Context } from '../../context/Context'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {

  const userRef = useRef()
  const passwordRef = useRef()
  const {dispatch, isFetching} = useContext(Context)
  const [ error, setError] = useState()
  const [pending, setPending] = useState(false)
  
  const [password, setPassword] = useState('password')
  const [eye, setEye] = useState('fa-solid fa-eye')

  const handleSubmit = async(e) =>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    setPending(true)
    try{
      const res = axios.post("http://localhost:3000/api/auth/login", 
      {
        email: userRef.current.value,
        password: passwordRef.current.value,
      })
      let token = await res
      dispatch({type:"LOGIN_SUCCESS", payload:token.data.user})
      setPending(false)
      window.location = "/"
      console.log(token)
    }
    catch(err){
      dispatch({type:"LOGIN_FAILURE"})
      setError(err.response.data)
      setPending(false)
    }
  }

  const handleClick = () => {
    if(password === 'password'){
      setPassword('text')
      setEye('fa-solid fa-eye-slash')
    }
    else {
      setPassword('password')
      setEye('fa-solid fa-eye')
    }
    

  }

  return (
    <div className="login">
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Email</label>
            <div>
              <input 
              type="text" 
              className='loginInput' 
              placeholder="Enter your email..." 
              ref={userRef} />
            </div>
            <label>Password</label>
            <div>
              <input 
              type={password} 
              className='loginInput' 
              placeholder="Enter your password..."
              ref={passwordRef}
              /><i className={eye} onClick={handleClick}></i>
             </div>
            <button className="loginButton" type="submit">Login</button>
        </form>
        {pending && 
        (<span>Loading...</span>)}
        {error && 
        (<span style={{color:"red", marginTop:"10px"}}>{error}</span>)}
        <span><Link to="/register" className="linkRegister">You don't have an account yet ? Register !</Link></span>
    </div>
  )
}
