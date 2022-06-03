import axios from "axios"

export const getCats = async ()=>{
    const res = await axios.get(process.env.REACT_APP_PROXY + '/api/posts/cat/')
    const categories = []
    const data = res.data.filter(e => e.isPublished === true)
    data.forEach(e => {e.categories.forEach(e=> categories.push(e))})
    const cat = [...new Set(categories)]
    return cat
  }