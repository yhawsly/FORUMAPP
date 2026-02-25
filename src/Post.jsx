import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShare, faRetweet, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Post = ({ post, onLike, onComment, onShare, onMessage }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onComment(post.id, commentText);
    setCommentText('');
  };

  const handleShare = () => {
    const textToShare = `Check out this post from ${post.user.name}: "${post.content}"`;
    navigator.clipboard.writeText(textToShare);
    alert('Post link copied to clipboard!');
    if (onShare) onShare(post.id);
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
          onClick={() => onLike(post.id)}
          style={{ color: post.isLiked ? '#ff4b4b' : 'var(--text-secondary)' }}
        >
          <FontAwesomeIcon icon={faHeart} className="icon" />
          {post.likes}
        </button>
        <button className="action-btn" onClick={() => setShowComments(!showComments)}>
          <FontAwesomeIcon icon={faComment} className="icon" />
          {post.comments?.length || 0}
        </button>
        <button className="action-btn">
          <FontAwesomeIcon icon={faRetweet} className="icon" />
          {post.retweets || 0}
        </button>
        <button className="action-btn" onClick={handleShare}>
          <FontAwesomeIcon icon={faShare} className="icon" />
        </button>
        <button className="action-btn" onClick={() => onMessage && onMessage(post.user)} title="Message User">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
        </button>
      </div>

      {showComments && (
        <div className="comments-section" style={{ marginTop: '15px', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
          <form onSubmit={handleSubmitComment} style={{ display: 'flex', marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{ flex: 1, background: 'var(--primary-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '8px 15px', color: 'white', outline: 'none' }}
            />
            <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--accent-color)', marginLeft: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Post</button>
          </form>
          <div className="comments-list">
            {post.comments && post.comments.map((comment, idx) => (
              <div key={idx} className="comment-item" style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start' }}>
                <img src={comment.user.avatar} alt={comment.user.name} className="avatar" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                <div style={{ background: 'var(--hover-bg)', padding: '8px 12px', borderRadius: '12px', flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 'bold' }}>{comment.user.name}</p>
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
