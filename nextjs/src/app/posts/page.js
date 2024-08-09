
"use client"
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function PostPage() {
  const [post, setPost] = useState('');
  const [postContent, setPostContent] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    setPostContent(post);
    setPost('');
  };

  const handleLikeToggle = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Create a Post</h1>
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="Write something.."
          rows="4"
          cols="50"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          Post
        </button>
      </form>

      {postContent && (
        <div style={{ marginTop: '30px' }}>
          <h2>Posted Content</h2>
          <p>{postContent}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={handleLikeToggle}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                color: liked ? 'red' : 'gray',
                marginRight: '10px',
              }}
            >
              {liked ? <FaHeart /> : <FaRegHeart />}
            </button>
            <span>{likes} {likes === 1 ? 'like' : 'likes'}</span>
          </div>
        </div>
      )}
    </div>
  );
}


export default  PostPage;
// import PostClient from './client/page';
// import  initialPostContent from './server/page';
// import  initialLikes   from "./server/page"

// export {  initialPostContent, initialLikes };
//  function PostPage(props) {
//   return <PostClient {...props} />;
// }

// export default PostPage;