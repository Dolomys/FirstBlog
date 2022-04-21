import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

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
        <img src="https://d3isma7snj3lcx.cloudfront.net/images/news/30/3050813289/la-sublime-bande-son-de-celeste-a-desormais-ses-piano-collections-5f8dc259.jpg" alt="" />
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, a molestiae? Dolorem, eos facilis ad laudantium deleniti obcaecati facere quasi</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
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
            <i className="sidebarIcon fa-brands fa-facebook-f"></i>
            <i className="sidebarIcon fa-brands fa-twitter"></i>
            <i className="sidebarIcon fa-brands fa-instagram"></i>
        </div>
      </div>
    </div>
  )
}
