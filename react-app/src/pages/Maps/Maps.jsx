import './maps.css'
import Map from '../../components/Map/Map'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Maps() {


  const [post, setPost] = useState([])

  useEffect(()=> {
    const data = async() => {
      const res = await axios('https://randomuser.me/api/?results=50&inc=gender,name,location,gender,email,phone,picture&noinfo')
      setPost(res.data.results)
    }
    data()
  },[])
  return (
    <div className='mapPage'>
      <div className='filters'>
      </div>
      <div className='map'> 
          {post && <Map post={post}/> }
      </div>
    </div>
  )
}
