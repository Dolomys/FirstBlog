import { useContext } from 'react'
import axios from 'axios'
import { motion } from "framer-motion"
import { useState } from 'react'

import Sidebar from '../../components/sidebar/Sidebar'
import './settings.css'
import { Context } from "../../context/Context";
import loader from "../../img/loader.gif"
import celesteImg from'../../img/celesteImg.png'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import app from '../../firebase'


export default function Settings() {
  const [file, setFile] = useState(null)
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const {user, dispatch} = useContext(Context)
  const [loading, setLoading] = useState(false)

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

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
         
          const fileName = new Date().getTime() + file.name
          const storage = getStorage(app)
          const storageRef =  ref(storage, fileName)
          const uploadTask = uploadBytesResumable(storageRef, file);

          // Register three observers:
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          uploadTask.on('state_changed', 
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            }, 
            (error) => {
              // Handle unsuccessful uploads
            }, 
            async() => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              const url = await getDownloadURL(uploadTask.snapshot.ref)
              updatedUser.profilPic = url
              const res = await axios.put(process.env.REACT_APP_PROXY + '/api/auth/updateAcc/'+ user._id, updatedUser)
              console.log(res)
              dispatch({type:"UPDATE_ACCOUNT", payload:res.data})
              setSuccess(true)
              setLoading(false)
            })
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
                <img className='topImg' src={user.profilPic ? user.profilPic : celesteImg}   alt='profil' />
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
