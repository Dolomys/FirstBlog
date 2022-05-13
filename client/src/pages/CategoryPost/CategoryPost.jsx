import { useState, useEffect } from 'react';
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import './categoryPost.css'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';



export default function CategoryPost() {
  const [posts, setPosts] = useState([])
  const [searchParams] = useSearchParams();
  console.log(searchParams);


  useEffect(()=>{
    const fetchPosts = async () => {
      const res = await axios.get(process.env.REACT_APP_PROXY + `/api/posts/`)
      const filterPost = res.data.filter(e=> e.isPublished === true)
    //   const filterCats = filterPost.filter(e => e.categories.includes(cat))
    //   setPosts(filterCats)

    }
    fetchPosts()
  },[])

  console.log(posts)
  return (
    <>
     <Header />
     <div className="home">
       <Posts posts={posts}/>
       <Sidebar />
    </div>
    </>
   
  )
}
