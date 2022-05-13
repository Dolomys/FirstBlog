import Post from '../post/Post'
import './posts.css'

export default function Posts({posts, cats}) {
  // Filtre les elements brouillons
  return (
    <>
      <div className="posts">
        {posts && posts.map(e=> (
            <Post data={e} />
          ))
        }
      </div>
    </>
  )
}
