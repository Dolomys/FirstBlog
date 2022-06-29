import './singlepost.css'
import { Context } from '../../context/Context';
import FormInput from '../FormInput/FormInput';

import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'


export default function SinglePost() {

  //TODO Pouvoir modifer ou supprimer son commentaire

  let { id } = useParams()
  const [post, setPost] = useState()
  const [ modify, setModify] = useState(false)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const [categories, setCategories] = useState([])
  const [ isPublished, setIsPublished] = useState()
  const [commentContent ,setCommentContent] = useState()
  const [commentModified, setCommentModified] = useState()
  const [modifyComm, setModifyComm] = useState(false)
  const {user} = useContext(Context)

  const [ update, setUpdate] = useState(false)

  const comment = {
    id:"1",
    type:"text",
    placeholder:"Input your comment",
    label:"Input your comment",
  }
  const modifyCommentModel = {
    type:'text',
  }

  useEffect(()=>{
    const getPost = async () =>{
      const res = await axios.get(process.env.REACT_APP_PROXY + `/api/posts/${id}`)
      setPost(res.data)
      setIsPublished(res.data.isPublished)
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    getPost()
  },[id, update])

  const handleChange = () => {
    setModify(true)
  }
  const confirmChange = async() => {
    setUpdate(false)
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
      // res && window.location.reload()
      res && setUpdate(true)
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

  const submitComment = async(e) => {
    setUpdate(false)
    e.preventDefault()
    try {

      const data =  {
        comments: {
          username: user.username,
          userPhoto: user.profilPic,
          content: commentContent,
          dateOfPublish: Date.now(),
        }
       }
      const res = await axios.put(process.env.REACT_APP_PROXY + `/api/posts/comment/${id}`, data)
      // res && window.location.reload()
      res && setCommentContent("") 
      res && setUpdate(true)
    }
    catch(err) {
      console.log(err)
    }
  }

  const modifyComment = async() => {
    console.log('modify comment')
    setModifyComm(true)
  }
  const deleteComment = async(e) => {
    const removeId = e.target.getAttribute("data-remove");
    console.log(removeId)
    // try {
    //   const data =  {
    //     comments: {
    //       username: user.username,
    //       userPhoto: user.profilPic,
    //       content: commentContent,
    //       dateOfPublish: Date.now(),
    //     }
    //    }
    //   const res = await axios.put(process.env.REACT_APP_PROXY + `/api/posts/comment/${id}`, data)
    //   // res && window.location.reload()
    //   res && setCommentContent("") 
    //   res && setUpdate(true)
    // }
    // catch(err) {
    //   console.log(err)
    // }
  }

  // const confirmChangeComment = async() => {
  //   setUpdate(false)
  //   e.preventDefault()
  //   try {
  //     const data =  {
  //       comments: {
  //         username: user.username,
  //         userPhoto: user.profilPic,
  //         content: commentContent,
  //         dateOfPublish: Date.now(),
  //       }
  //      }
  //     const res = await axios.put(process.env.REACT_APP_PROXY + `/api/posts/comment/${id}`, data)
  //     // res && window.location.reload()
  //     res && setCommentContent("") 
  //     res && setUpdate(true)
  //   }
  //   catch(err) {
  //     console.log(err)
  //   }
  // }

  return (
    <div className="singlePost">
      {post && ( 
        <>
        <div className="singlePostWrapper">
          {post.photo && (
              <img src={post.photo}
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
      

      {/* COMMENTS */}
      <div className="commentBottom">
      
      {user ? (
        <>
        <h2 className="commentTitle">Comments</h2>
        <form action="POST" className="commentInput" onSubmit={submitComment}>
         <FormInput {...comment} onChange={e=> {setCommentContent(e.target.value)}} value={commentContent}/>
         <button type='submit'>Submit</button>
        </form>
        </>
        ):
        <h2>Sign in to add comments !</h2>
        }
        <div className="commentList">
            {post.comments && post.comments.slice(0).reverse().map(e => (
              <div className='comment' key={e._id}>
                <div className='commentAvatar'>
                    <img src={e.userPhoto} />
                </div>
                <div className="commentBody">
                  <div  className='commentInfo'> 
                    <span><strong>{e.username}</strong> • posted <ReactTimeAgo date={e.dateOfPublish} locale="en-US"/></span>
                    {/* {user?.username === e.username && (
                      <div className='modifyDeleteComment'>
                      <span onClick={modifyComment} className="modifyComment">Modify</span>
                      <span onClick={deleteComment} className="deleteComment" data-remove={e._id}>Delete</span>
                      </div>
                    )} */}
                  </div>
                  <div className='commentContent'>
                  {/* {(modifyComm && user?.username === e.username) ? 
                     <form action="POST" className="commentInput" onSubmit={confirmChangeComment}>
                     <FormInput {...modifyCommentModel} onChange={e=> {setCommentModified(e.target.value)}} placeholder={e.content}/>
                     <button type='submit'>Submit</button>
                    </form>
                    :
                    <span>{e.content}</span>
                  } */}
                  <span>{e.content}</span>
                  </div>

                  <div className="commentFooter">

                  </div>
                </div>
                
               
              </div>
            ))}
        </div>
      </div>
      </>
    )}
    </div>
  )
}
