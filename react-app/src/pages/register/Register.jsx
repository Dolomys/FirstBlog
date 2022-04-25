import './register.css'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [error, setError] = useState(false)
  const [pending, setPending] = useState(false)

  // Toggle eye password
  const [pass1, setPass1] = useState('password')
  const [ eye1, setEye1] = useState('fa-solid fa-eye')
  const [pass2, setPass2] = useState('password')
  const [ eye2, setEye2] = useState('fa-solid fa-eye')

  // TO DO - handle Pending (add loading component)
  const handleSubmit = async (e)=>{
    setPending(true)
    e.preventDefault();
    try{
      setError(false)
      const res = await axios.post(process.env.REACT_APP_PROXY + "/api/auth/register", {
        username,
        email,
        password,
        password2
      })
      setPending(false)
      console.log(res)
      res.data && window.location.replace("/login")
    }
    catch(err){
      setPending(false)
      setError(true)
    }
   
  }

  const handleClick = (e) => {
    console.log(e.target.id)

    if(e.target.id === "pass1"){
      if(e.target.className === 'fa-solid fa-eye' ){
        e.target.className = 'fa-solid fa-eye-slash'
        setPass1('text')
      }
      else {
        e.target.className = 'fa-solid fa-eye'
        setPass1('password')
      }
    }
    if(e.target.id === "pass2"){
      if(e.target.className === 'fa-solid fa-eye' ){
        e.target.className = 'fa-solid fa-eye-slash'
        setPass2('text')
      }
      else {
        e.target.className = 'fa-solid fa-eye'
        setPass2('password')
      }
    }
  }


  return (
    <div className="register">
        <form className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <div>
              <input 
                type="text"
                className='registerInput'
                placeholder="Enter your username..." 
                onChange={e=>setUsername(e.target.value)}
                />
            </div>
            <label>Email</label>
            <div>
              <input 
              type="text" 
              className='registerInput' 
              placeholder="Enter your email..." 
              onChange={e=>setEmail(e.target.value)}
              />
            </div>
            
            <label>Password</label>
            <div>
              <input type={pass1} 
              className='registerInput' 
              placeholder="Enter your password..." 
              onChange={e=>setPassword(e.target.value)}
              />
              <i id="pass1" className={eye1} onClick={handleClick}></i>
            </div>
          
            <label>Confirm Password</label>
            <div>
              <input type={pass2}
              className='registerInput' 
              placeholder="Confirm your password" 
              onChange={e=>setPassword2(e.target.value)}
              />
              <i id="pass2" className={eye2} onClick={handleClick}></i>
            </div>
            <button className="registerButton">Register</button>
        </form>
        {pending && 
        (<span>Loading...</span>)}
        {error && 
        (<span style={{color:"red", marginTop:"10px"}}>Something went Wrong</span>)}

        <span><Link to="/login" className='linkLogin'>I already have an account !</Link></span>
    </div>
  )
}
