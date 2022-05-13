import { useState, useEffect } from 'react';
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';

import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'
import { PaginatedItems } from '../../components/paginate/Paginate';




export default function Home() {
  const [posts, setPosts] = useState([])
  const [searchParams] = useSearchParams();
  const [cat, setCat] = useState()
 
  useEffect(()=>{

    const categories = searchParams.get('cat')
    const fetchPosts = async () => {
      const res = await axios.get(process.env.REACT_APP_PROXY + `/api/posts/cat/${categories ? categories : "" }`)
      //TODO tout filtrer dans le bac
      const filterPost = res.data.filter(e=> e.isPublished === true)
      setPosts(filterPost)
      setCat(categories);
    }
    fetchPosts()
  },[searchParams])


  return (
    <>
     <div className="home">
       <PaginatedItems posts={posts} itemsPerPage={6}/>
       <Sidebar />
    </div>
    </>
   
  )
}
