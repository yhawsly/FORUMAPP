import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShare, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Post = ({ post, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={post.user.avatar} alt={post.user.name} className="avatar" />
        <div className="post-info">
          <h4>{post.user.name}</h4>
          <span>{post.timestamp}</span>
        </div>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="post content" style={{ width: '100%', borderRadius: '12px', marginTop: '10px' }} />}
      </div>
      <div className="post-actions">
        <button 
          className="action-btn" 
          onClick={handleLike}
          style={{ color: isLiked ? 'var(--accent-color)' : 'var(--text-secondary)' }}
        >
          <FontAwesomeIcon icon={faHeart} className="icon" />
          {post.likes + (isLiked ? 1 : 0)}
        </button>
        <button className="action-btn">
          <FontAwesomeIcon icon={faComment} className="icon" />
          {post.comments || 0}
        </button>
        <button className="action-btn">
          <FontAwesomeIcon icon={faRetweet} className="icon" />
          {post.retweets || 0}
        </button>
        <button className="action-btn">
          <FontAwesomeIcon icon={faShare} className="icon" />
        </button>
      </div>
    </div>
  );
};

export default Post;
