import { useContext, useState } from 'react'
import axios from 'axios'
import CreatableSelect from "react-select/creatable";
import 'draft-js/dist/Draft.css';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import app from '../../firebase'

import { Context } from "../../context/Context";
import'./write.scss'


export default function Write() {

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const [categories, setCategories] = useState()
  const {user} = useContext(Context)
  const [isPublished, setIsPublished] = useState(true)
  const options = []

    const getCats = async () => {
      const res = await axios.get(process.env.REACT_APP_PROXY + '/api/posts/cat/')
      const resCategories = []
      const a = res.data.filter(e => e.isPublished === true)
      a.forEach(e => {e.categories.forEach(e=> resCategories.push(e))})
      const cat = [...new Set(resCategories)]
      console.log(cat)
      cat.map(e => options.push({value:e, label:e}))
    }
    getCats()
 
 

  const handleChange = (newValue, actionMeta) => {
    const newValuesArr = newValue ? newValue.map(item => item.value) : [];
    // console.log(newValuesArr)
    setCategories({ values: newValuesArr });
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    const newPost = {
      username: user.username,
      title,
      desc,
      isPublished,
      cats : categories.values
    }
    // Gére les brouillons
    if(!isPublished) {
      newPost.isPublished = false
    }
    console.log(newPost)
    if(file){
      const fileName = new Date().getTime() + file.name
      const storage = getStorage(app)
      const storageRef =  ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // Handle unsuccessful uploads
        }, 
        async() => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          const url = await getDownloadURL(uploadTask.snapshot.ref)
          newPost.photo = url
          const res = await axios.post(process.env.REACT_APP_PROXY + '/api/posts/add', newPost)
          window.location.replace("/post/"+res.data._id)
        })
    }
     
  }

  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
        )}
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="submit">
          <button className="writeSubmit" type='submit' id="Publish">Publish</button>
         <button className="draftSubmit" type='submit' id="draft" onClick={e => setIsPublished(false)}>Save as Draft</button>
          </div>
           <div className="writeFormGroup">
                <label htmlFor="fileInput">
                 <i className="writeIcon fa-solid fa-plus"></i>
                </label>
                <input type="file" id="fileInput" style={{display:"none"}} onChange={e => setFile(e.target.files[0])} />
                <input type="text" id="Title" placeholder='Title' className='writeInput' autoFocus={true} onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className="writeFormGroup">
            <CreatableSelect
              isMulti
              options={options}
              onChange={handleChange}
              placeholder='Categories, Select or Create'
            />
            </div>
            <div className="writeFormGroup">
                <textarea 
                placeholder="Tell your story" 
                type="text" 
                className='writeInput writeText'
                onChange={e => setDesc(e.target.value)}
                />
                {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
            </div>
        </form>
    </div>
  )
}
