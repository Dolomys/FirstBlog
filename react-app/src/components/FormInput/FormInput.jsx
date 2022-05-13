import { useState } from 'react'
import './formInput.css'

export default function FormInput(props) {
    const [focus, setFocus] = useState(false)
    const {id,errorMessage, onChange,label,type,...inputProps} = props

    console.log(props)
    //Toggle eye password
    const [pass, setPass] = useState(type)
    const [eye] = useState("fa-solid fa-eye")

    const handleFocus = (e) => {
        setFocus(true)
    }

    const handleClick = (e) => {
        if(e.target.id === "pass1"){
          if(e.target.className === 'fa-solid fa-eye' ){
            e.target.className = 'fa-solid fa-eye-slash'
            setPass('text')
          }
          else {
            e.target.className = 'fa-solid fa-eye'
            setPass('password')
          }
        }
      }

  return (
    <div className="formInput">
        <label>{label}</label>
        <input type={pass}
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        // onFocus={() => inputProps.name==="confirmPassword" && setFocus(true)}
        focused={focus.toString()} />
         {(inputProps.name === "password" ||inputProps.name === "confirmPassword") && (
            <i id="pass1" className={eye} onClick={handleClick}></i>
        )}
         <span className='errorMsg'>{errorMessage}</span>
    </div>
   
  )
}
