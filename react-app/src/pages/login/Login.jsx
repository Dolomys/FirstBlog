import './login.scss'

import { useContext } from 'react'
import axios from 'axios'
import { motion } from "framer-motion"
import loader from "../../img/loader.gif"

import { Context } from '../../context/Context'
import { useState } from 'react'
import FormInput from '../../components/FormInput/FormInput'

  
  export default function Login() {

  const {dispatch} = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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
      setLoading(true)
      setError("")
      dispatch({type:"LOGIN_START"})
      try{
        const res = axios.post(process.env.REACT_APP_PROXY + "/api/auth/login", values)
        let token = await res
        setLoading(false)
        dispatch({type:"LOGIN_SUCCESS", payload:token.data.user})
        window.location = "/"
        console.log(token)
      }
      catch(err){
        dispatch({type:"LOGIN_FAILURE"})
        setLoading(false)
        setError(err.response.data)
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
              <motion.button
               className="submitBtn"
               type='submit'
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               >login</motion.button>
          </form>
          {error && <span className='errorLogin'>{error}</span>}
          {loading && <img src={loader} alt="loading..." /> }
        </div>
      </div>
    )
  }
