import './login.css'

import { useContext } from 'react'
import axios from 'axios'

import { Context } from '../../context/Context'
import { useState } from 'react'
import FormInput from '../../components/FormInput/FormInput'

  
  export default function Login() {

  const {dispatch} = useContext(Context)

  const [values,setValues] = useState({
    email:'',
    password:''
  })
  
    const inputs = [
      {
        id:1,
        name:"email",
        type:"email",
        placeholder:'Email',
        errorMessage:'Please enter a correct Email address',
        label:'Email',
        required:true,
      },
      {
        id:5,
        name:"password",
        type:"password",
        placeholder:'Password',
        errorMessage:'Please enter a password',
        required:true,
        label:'Password'
      },
    ]
  
  
    const handleSubmit = async(e) =>{
      e.preventDefault()
      dispatch({type:"LOGIN_START"})
      try{
        const res = axios.post(process.env.REACT_APP_PROXY + "/api/auth/login", values)
        let token = await res
        dispatch({type:"LOGIN_SUCCESS", payload:token.data.user})
        window.location = "/"
        console.log(token)
      }
      catch(err){
        dispatch({type:"LOGIN_FAILURE"})
      }
    }
  
    const onChange = (e) => {
      setValues({...values, [e.target.name]: e.target.value})
    }
  
    return (
      <div className="login">
        <div className='loginDiv'>
          <h1 className='loginTitle'>Login</h1>
          <form action="POST" className="loginForm" onSubmit={handleSubmit}>
              {inputs.map(e => (
                <FormInput key={e.id} {...e} value={values[e.name]} onChange={onChange} />
              ))}
              <button className="submitBtn" type='submit'>login</button>
          </form>
        </div>
      </div>
    )
  }
