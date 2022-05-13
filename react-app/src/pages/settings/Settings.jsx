import { useContext } from 'react'
import axios from 'axios'

import Sidebar from '../../components/sidebar/Sidebar'
import './settings.css'
import { Context } from "../../context/Context";
import { useState } from 'react'

export default function Settings() {
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const {user, dispatch} = useContext(Context)

  const PF =process.env.REACT_APP_PROXY + '/public/images/'

  console.log(user)


  const handleSubmit = async(e) => {
    e.preventDefault()
    if(password === password2) {
      const updatedUser = {
        oldUsername : user.username,
        userId: user._id,
        username,
        email,
        password
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
          console.log(err)
        }
      }
      try {
        const res = await axios.put(process.env.REACT_APP_PROXY + '/api/auth/updateAcc/'+ user._id, updatedUser)
        window.location = "/"
       
        dispatch({type:"UPDATE_ACCOUNT", payload:res.data})
      }
      catch(err) {
        console.log(err)
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
                <span className="settingsDeleteTitle">Delete Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
                <label>Profil Picture</label>
                <div className="settingsPP">
                {file ? (
                <img src={URL.createObjectURL(file)} alt="" className="topImg" />
                ) : (
                <img className='topImg' src={PF + (user.profilPic || "celesteicon.png")}  alt='profil' />
                )}
                  <label htmlFor="fileInput">
                      <i className=" settingsPPIcon fa-solid fa-user"></i>
                  </label>
                  <input type="file" id="fileInput" style={{display:"none"}}  onChange={e => setFile(e.target.files[0])} />
                </div>
                <label>Username</label>
                <input type="text" defaultValue={user.username} onChange={e => setUsername(e.target.value)}/>
                <label>Email</label>
                <input type="text" defaultValue={user.email} onChange={e => setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
                <label>Confirm Password</label>
                <input type="password"  onChange={e => setPassword2(e.target.value)}/>
                <button className="settingsSubmit" type="submit">Update</button>
            </form>
        </div>
        <Sidebar />
    </div>
  )
}
