import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import './menu.scss'

export const Menu = ({side, setSide}) => {

    const { user} = useContext(Context)

  return (
    <div className={"menu " + (side && "active")}>
        <ul>
            {user ? 
            <>
                <li onClick={() => setSide(false)}>
                    <Link   Link to='/write'>Write</Link>
                </li>
                <li onClick={() => setSide(false)}>
                    <Link to={`/settings/${user._id}`}>Settings</Link>
                </li>
                <li onClick={() => setSide(false)}>
                    <Link to='/myposts'>My Posts</Link>
                </li>
            </>
            : 
            <>
                <li onClick={() => setSide(false)}>
                    <Link to='/login'>Login</Link>
                </li>
                <li onClick={() => setSide(false)}>
                    <Link to='/register'>Register</Link>
                </li>
            </>
            }
           
        </ul>
    </div>
  )
}
