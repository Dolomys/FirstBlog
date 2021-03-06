import { Link } from 'react-router-dom'
import './post.css'

export default function Post({data}) {

    return (
        <div className="post">
            <Link to={`/post/${data._id}`} className='link'>
            {data.photo && (
            <img src={data.photo}
             alt="Blog Post" 
             className="postImg" />
            )}
            <div className="postInfo">
                
               {!data.isPublished && <span className='drafted'>Draft</span>}
                <span className="postTitle">
                    {data.title}
                </span>
                <span className="postDate">{new Date(data.createdAt).toDateString()}</span>
            </div>
            <p className='postDescription'>{data.desc}</p>
            </Link>
        </div>
    )
}
