import './singlepost.css'
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function SinglePost() {


  let { id } = useParams()
  const [post, setPost] = useState()
  const [ modify, setModify] = useState(false)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const [categories, setCategories] = useState([])
  const [ isPublished, setIsPublished] = useState()
  const {user} = useContext(Context)

  const PF =process.env.REACT_APP_PROXY + '/public/images/'


  useEffect(()=>{
    const getPost = async () =>{
      const res = await axios.get(process.env.REACT_APP_PROXY + `/api/posts/${id}`)
      setPost(res.data)
      setIsPublished(res.data.isPublished)
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    getPost()
  },[id])

  const handleChange = () => {
    setModify(true)
  }
  const confirmChange = async() => {
    setModify(false)
    try {

      const data =  {
        title,
        desc,
        username: user.username,
        isPublished
       }
       if(isPublished) {
         data.isPublished = true
       }

      const res = await axios.put(process.env.REACT_APP_PROXY + `/api/posts/${id}`, data)
      res && window.location.reload()
    }
    catch(err) {
      console.log(err)
    }
  }
  const handleDelete = async() => {
    try{
      console.log(post)
      const res = await axios.delete(process.env.REACT_APP_PROXY + `/api/posts/${id}`, { data: { username: post.username } })
      if(res){
        alert("Your post has been deleted")
        window.location = "/"
      }
    }
    catch(err){

    }

  }

  // console.log(post.title)
  console.log(post)

  return (
    <div className="singlePost">
      {post && ( 
        <div className="singlePostWrapper">
          {post.photo && (
              <img src={PF + post.photo}
              alt="Blog Post" 
              className="postImg" />
              )}


          {!modify ? (
             <h1 className="singlePostTitle">{post.title}
                <div className="singlePostEdit">
                { user?.username === post.username && 
                (<>
                <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={handleChange}></i>
                <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                </>)
                  
                }
                  
                </div>
               </h1>
          ) : (
            <input
              type="text"
              className="singlePostTitleInput" 
              onChange={e => setTitle(e.target.value)} 
              defaultValue={post.title}
              autoFocus>
            </input> 
          )
          }
          <div className="singlePostInfo">
              <span className="singlePostAuthor">Author:
                <Link to={`/?user=${post.username}`} className="link">
                <b> {post.username} </b>
                </Link>
               </span>
               <ul className='SingPostCats'>{post.categories.map(e=> {
                 return <Link to={"/?cat="+e}><li className='SinglePostCat'>{e}</li></Link>
               })}</ul>
              <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
          </div>
          <p className="singlePostDesc">{post.age}</p>
          {!modify ? (
            <p className="singlePostDesc">{post.desc}</p>
          ) : (
            <>
            <input type="text" className="singlePostDescInput" defaultValue={post.desc} onChange={e => setDesc(e.target.value)}></input>
            <input type="checkbox" className='draftOrPublished' defaultChecked={isPublished} onChange={e => setIsPublished(e.target.checked)}/>
            <span> Cocher pour publier votre article ( si la case est décoché , l'article passe en mode brouillon )</span>
            <button onClick={confirmChange} className="ConfirmBtn">Confirm Changes<i class="fa-solid fa-check" style={{paddingLeft:'1em'}}></i></button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
