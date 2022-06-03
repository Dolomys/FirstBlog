import './myPosts.css'

import { useState, useEffect } from 'react';
import axios from 'axios'

import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext } from 'react';
import { Context } from '../../context/Context';



export default function MyPosts() {

    const [posts, setPosts] = useState([])
    const { user } = useContext(Context)
  
    useEffect(()=>{
      const fetchPosts = async () => {
        const res = await axios.get(process.env.REACT_APP_PROXY + `/api/posts/cat/`)
        //TODO filtrer dans le bac
        const postfiltered = res.data.filter(e => e.username === user.username)
        setPosts(postfiltered)
  
      }
      fetchPosts()
    },[])
  
    console.log(posts)
    return (
      <>
       <div className="home">
         <Posts posts={posts}/>
         <Sidebar />
      </div>
      </>
     
    )
  }
  
