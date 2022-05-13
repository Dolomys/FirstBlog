import { useState } from 'react'
import axios from 'axios'
import FormInput from '../../components/FormInput/FormInput'
import './register.css'

export default function Register() {

    const [values,setValues] = useState({
      firstName:'',
      lastName:'',
      email:'',
      birthday:'',
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
        name:"firstName",
        type:"text",
        placeholder:'First Name',
        errorMessage:'Your first name cannot contain any special character',
        label:'First Name'
      },
      {
        id:3,
        name:"lastName",
        type:"text",
        placeholder:'Last Name',
        errorMessage:'Your last name cannot contain any special character',
        label:'Last Name'
      },
      {
        id:4,
        name:"birthday",
        type:"date",
        placeholder:'Birthday',
        errorMessage:'Please enter your birthdate',
        label:'Birthday',
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
      console.log(values)
      e.preventDefault()
      await axios.post(process.env.REACT_APP_PROXY + "/api/auth/register", values)
      
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
            <button className="submitBtn" type='submit'>Register</button>
        </form>
    </div>
  )
}
