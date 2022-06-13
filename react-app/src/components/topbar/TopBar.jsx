import "./topbar.css"
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { Context } from "../../context/Context";
import celesteImg from'../../img/celesteImg.png'

export default function TopBar({side, setSide}) {

    const { user, dispatch } = useContext(Context)
    const PF =process.env.REACT_APP_PROXY + '/public/images/'

   const handleLogout = () => {
       console.log("logout")
       dispatch({type: "LOGOUT"})
       window.location="/"
   }

  return (
    <div className='top'>
        <div className="topLeft">
        </div>
        <div className="topCenter">
            <nav className="toplist">
            <Link to="/" className="topListItem">Home</Link>
                {user &&
                <>
                    <Link to="/Write" className="topListItem">Write</Link>
                    <li className="topListItem" onClick={handleLogout}>Logout</li>
                </>
                }
               
        
              
            </nav>
        </div>
        <div className="topRight">
            {user ? 
                <>
                <Link to={`/settings/${user._id}`} >
                    <img className='topImg'
                        src={user.profilPic ? (PF + user.profilPic)  : celesteImg} 
                        alt=''>
                    </img>
                </Link>
                <Link to={`/settings/${user._id}`} className="linkMySettings">Settings</Link>
                <Link to='/myposts' className="linkMyposts">My Posts</Link>
                </>
                : 
                <>
                 <Link to="/login" className="topListItem">Login</Link>
                  <Link to="/register" className="topListItem">Register</Link>
                </>
            }  
        <i class="fa-solid fa-bars" onClick={() => setSide(!side)}></i>
        </div>
    </div>
  )
}
