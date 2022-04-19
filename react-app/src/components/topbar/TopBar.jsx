import "./topbar.css"
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {

    const { user, dispatch } = useContext(Context)
    const PF ='http://localhost:3000/public/images/'

   const handleLogout = () => {
       console.log("hi")
       dispatch({type: "LOGOUT"})
       window.location="/"
   }

  return (
    <div className='top'>
        <div className="topLeft">
            <i className="topIcon fa-brands fa-facebook-f"></i>
            <i className="topIcon fa-brands fa-twitter"></i>
            <i className="topIcon fa-brands fa-instagram"></i>
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
                        src={PF + (user.profilPic || "celesteicon.png")} 
                        alt=''>
                    </img>
                </Link>
                <Link to={`/settings/${user._id}`} className="linkMySettings">Settings</Link>
                <Link to={`/Account/${user._id}`} className="linkMySettings">My Account</Link>
                <Link to='/myposts' className="linkMyposts">My Posts</Link>
                </>
                : 
                <>
                 <Link to="/login" className="topListItem">Login</Link>
                  <Link to="/register" className="topListItem">Register</Link>
                </>
            }  
        </div>
    </div>
  )
}
