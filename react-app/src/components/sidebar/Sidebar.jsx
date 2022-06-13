import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './sidebar.scss'

export default function Sidebar() {
  const [cats, setCats] = useState([])

  useEffect(()=>{
      const getCats = async ()=>{
        const res = await axios.get(process.env.REACT_APP_PROXY + '/api/posts/cat/')
        const categories = []
        const data = res.data.filter(e => e.isPublished === true)
        data.forEach(e => {e.categories.forEach(e=> categories.push(e))})
        const cat = [...new Set(categories)]
        console.log(cat)
        setCats(cat)
        // setCats(res.data.categories)
      }
      getCats()
  },[])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="https://images.unsplash.com/photo-1586380951230-e6703d9f6833?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="" />
        <p>Welcome To my Blog, I'm a Web Developper Junio and this is my first project, i try to share some of my thoughts and work on this every week !
          <br /> Enjoy your time here and you can try to post some content as well ! </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle"> SELECT CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c)=>(
            <Link to={`/?cat=${c}`} className="link">
            <li className='sidebarListItem'>{c.charAt(0).toUpperCase() + c.slice(1)}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW ME</span>
        <div className="sidebarSocial">
            <a href='https://www.linkedin.com/in/alexandre-florent-624a84211'><i className="sidebarIcon fa-brands fa-linkedin"></i></a>
        </div>
      </div>
    </div>
  )
}
