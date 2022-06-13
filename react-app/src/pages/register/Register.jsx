import { useState } from 'react'
import axios from 'axios'
import loader from "../../img/loader.gif"
import FormInput from '../../components/FormInput/FormInput'
import './register.scss'
import { motion } from "framer-motion"

export default function Register() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

    const [values,setValues] = useState({
      email:'',
      username:'',
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
        id:2,
        name:"username",
        type:"text",
        placeholder:'Username',
        errorMessage:'Please enter a Username',
        label:'Username',
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
      {
        id:6,
        name:"confirmPassword",
        type:"password",
        placeholder:'Confirm Password',
        errorMessage:"Passwords don't match",
        pattern:values.password,
        required:true,
        label:'Confirm Password'
      },
    ]

    const HandleSubmit = async(e) => {
      e.preventDefault()
      setLoading(true)
      setError("")
      try {
        await axios.post(process.env.REACT_APP_PROXY + "/api/auth/register", values)
        setLoading(false)
        setSuccess(true)
        setTimeout(() =>  window.location.replace("/login"), 3000)
       
      }
      catch(err) {
        console.log(err.response.data)
        setLoading(false)
        setError(err.response.data)
      }
  
      
    }

    const onChange = (e) => {
      setValues({...values, [e.target.name]: e.target.value})
    }

  return (
    <div className="register">
        <h1 className='registerTitle'>Register</h1>
        <form action="POST" className="registerForm" onSubmit={HandleSubmit}>
            {inputs.map(e => (
              <FormInput key={e.id} {...e} value={values[e.name]} onChange={onChange} />
            ))}
            <motion.button className="submitBtn"
             type='submit'
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             >Register</motion.button>
        </form>
        {success && <span className='successRegister'>Account Created !</span>}
        {error && <span className='errorRegister'>{error}</span>}
        {loading && <img src={loader} alt="loading..." /> }
    </div>
  )
}
