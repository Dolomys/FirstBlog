import { useContext } from 'react'
import axios from 'axios'
import { motion } from "framer-motion"
import { useState } from 'react'

import Sidebar from '../../components/sidebar/Sidebar'
import './settings.css'
import { Context } from "../../context/Context";
import loader from "../../img/loader.gif"
import celesteImg from'../../img/celesteImg.png'


export default function Settings() {
  const [file, setFile] = useState(null)
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const {user, dispatch} = useContext(Context)
  const [loading, setLoading] = useState(false)

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const PF =process.env.REACT_APP_PROXY + '/public/images/'

  console.log(user)


  const handleSubmit = async(e) => {
    setLoading(true)
    setError(false)
    setSuccess(false)
    e.preventDefault()
    if(!password) {
        const updatedUser = {
          oldUsername : user.username,
          userId: user._id,
        }
        if(file){
          const data = new FormData()
          const filename = Date.now() + file.name;
          data.append("name",filename)
          data.append("file",file)
          updatedUser.profilPic = filename
          try{
            await axios.post(process.env.REACT_APP_PROXY + '/api/upload', data)
          }
          catch(err){
            setError(err.response.data)
          }
        }
        try {
          const res = await axios.put(process.env.REACT_APP_PROXY + '/api/auth/updateAcc/'+ user._id, updatedUser)
          dispatch({type:"UPDATE_ACCOUNT", payload:res.data})
          setSuccess(true)
          // setTimeout(() => setSuccess(false), 5000)
          setLoading(false)
        }
        catch(err) {
          setError(err.response.data)
          setLoading(false)
        }
    }

    if(password === password2) {
      const updatedUser = {
        oldUsername : user.username,
        userId: user._id,
        password
      }

      try {
        const res = await axios.put(process.env.REACT_APP_PROXY + '/api/auth/updateAcc/'+ user._id, updatedUser)
        dispatch({type:"UPDATE_ACCOUNT", payload:res.data})
        setSuccess(true)
        // setTimeout(() => setSuccess(false), 5000)
        setLoading(false)
      }
      catch(err) {
        setError(err.response.data)
        console.log(err.response)
        setLoading(false)
      }
    }
    else {
      alert('Passwords do not match !')
    }
     
  }



  return (
    <div className="settings">
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your Account</span>
                {/* <span className="settingsDeleteTitle">Delete Account</span> */}
            </div>

            <form className='imgForm' onSubmit={handleSubmit} enctype="multipart/form-data">
                <label>Profil Picture</label>
                <div className="settingsPP">
                {file ? (
                <img src={URL.createObjectURL(file)} alt="" className="topImg" />
                ) : (
                <img className='topImg' src={user.profilPic ? (PF + user.profilPic)  : celesteImg}   alt='profil' />
                )}
                  <label htmlFor="fileInput">
                      <i className=" settingsPPIcon fa-solid fa-user"></i>
                  </label>
                  <input type="file" id="fileInput" style={{display:"none"}}  onChange={e => setFile(e.target.files[0])} />
                </div>
                <motion.button className='pictureSubmit' type='submit'>Change Profile Picture</motion.button>
              </form>

              <form className="settingsForm" onSubmit={handleSubmit}>
                <label>Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
                <label>Confirm Password</label>
                <input type="password"  onChange={e => setPassword2(e.target.value)}/>
                <button className="settingsSubmit" type="submit">Change Password</button>
            </form>
            <div className="notifications">   
            {/* {error && <span className='errorRegister'>{error}</span>} */}
            {loading && <img src={loader} alt="loading..." /> }
            {success && <span className='successMsg'>Your account has been modified !</span>}
            </div>
        </div>
        <Sidebar />
    </div>
  )
}
