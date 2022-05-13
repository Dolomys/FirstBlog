import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import CreatableSelect from "react-select/creatable";
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

import { Context } from "../../context/Context";
import'./write.css'
import TextEditor from '../../components/TextEditor/TextEditor';

export default function Write() {

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const [categories, setCategories] = useState()
  const {user} = useContext(Context)
  const [isPublished, setIsPublished] = useState(true)
 

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

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
      const data = new FormData()
      const filename = Date.now() + file.name;
      data.append("name",filename)
      data.append("file",file)
      newPost.photo = filename
      try{
        await axios.post(process.env.REACT_APP_PROXY + '/api/upload', data)
      }
      catch(err){

      }
    }
    try {
      console.log(newPost)
      const res = await axios.post(process.env.REACT_APP_PROXY + '/api/posts/add', newPost)
      window.location.replace("/post/"+res.data._id)
    }
    catch(err) {
      console.log(err)
    }
     
  }

  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
        )}
        <form className="writeForm" onSubmit={handleSubmit}>
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
            <button className="writeSubmit" type='submit' id="Publish">Publish</button>
            <button className="draftSubmit" type='submit' id="draft" onClick={e => setIsPublished(false)}>Save as Draft</button>
        </form>
    </div>
  )
}
