import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './header.css'

export default function Header() {
  const [title, setTitle] = useState()
  const [display, setDisplay] = useState('block')

  const location = useLocation()
  

  useEffect(()=> {
    setDisplay('block')
    let b =  location.pathname.substring( location.pathname.indexOf("/") + 1 );
    let a = b.charAt(0).toUpperCase() + b.slice(1);
  // Special case with id in Url
  // Have to use Here
  //TODO find a better way to do this
    if(a.includes('Settings')){
      a = 'Settings'
    }
    if(a.includes('Account')){
      a = 'My Account'
    }
    if(a.includes('Myposts')){
      a = 'My Articles'
    }
    else if(a.includes('Login') || a.includes('Register') || a.includes('Post')){
      setDisplay('none')
    }
    if(!a){
      a = 'Home'
    }

    setTitle(a)
  },[location])

  return (
    <div className="header" style={{display: display}}>
        <div className="headerTitles">
            <span className="headerTitleLg">{title}</span>
        </div>
        <img className='headerImg' src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="celeste"></img>
    </div>
  )
}
