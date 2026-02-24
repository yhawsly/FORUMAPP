import './App.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faGear,
  faHome,
  faHashtag,
  faUser,
  faSearch,
  faPlus,
  faEllipsisVertical,
  faFaceSmile,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import Post from './Post';

const INITIAL_POSTS = [
  {
    id: 1,
    user: {
      name: "Hedy Lamarr",
      avatar: "https://i.imgur.com/yXOvdOSs.jpg",
    },
    content: "Just started exploring the new Gospel Fun Forum! The layout is looking amazing. #Tech #Social",
    timestamp: "2h ago",
    likes: 12,
    comments: 5,
    retweets: 2,
  },
  {
    id: 2,
    user: {
      name: "Greg Smith",
      avatar: "https://i.pravatar.cc/150?u=greg",
    },
    content: "Does anyone have recommendations for good community management tools? 🛠️",
    timestamp: "4h ago",
    likes: 8,
    comments: 12,
    retweets: 1,
  },
];

function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  const [activeTab, setActiveTab] = useState('Home');
  const [currentUser] = useState({
    name: "Hedy Lamarr",
    avatar: "https://i.imgur.com/yXOvdOSs.jpg",
  });

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost = {
      id: posts.length + 1,
      user: currentUser,
      content: newPostContent,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      retweets: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const handleLike = (postId) => {
    // In a real app, we would update the backend here
    console.log(`Liked post ${postId}`);
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <h1>Gospel Fun</h1>
        </div>
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} style={{ color: 'var(--text-secondary)' }} />
          <input type="text" placeholder="Search for topics, people..." />
        </div>
        <div className="nav-right">
          <FontAwesomeIcon icon={faBell} className="icon" style={{ cursor: 'pointer', fontSize: '1.2rem' }} />
        </div>
      </nav>

      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')}>
            <FontAwesomeIcon icon={faHome} className="icon" />
            <span>Home</span>
          </div>
          <div className={`nav-item ${activeTab === 'Explore' ? 'active' : ''}`} onClick={() => setActiveTab('Explore')}>
            <FontAwesomeIcon icon={faHashtag} className="icon" />
            <span>Explore</span>
          </div>
          <div className={`nav-item ${activeTab === 'Notifications' ? 'active' : ''}`} onClick={() => setActiveTab('Notifications')}>
            <FontAwesomeIcon icon={faBell} className="icon" />
            <span>Notifications</span>
          </div>
          <div className={`nav-item ${activeTab === 'Profile' ? 'active' : ''}`} onClick={() => setActiveTab('Profile')}>
            <FontAwesomeIcon icon={faUser} className="icon" />
            <span>Profile</span>
          </div>
          <div className="nav-item">
            <FontAwesomeIcon icon={faGear} className="icon" />
            <span>Settings</span>
          </div>
        </aside>

        {/* Feed */}
        <main className="feed-container">
          <div className="create-post">
            <textarea
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <div className="create-post-actions">
              <div className="media-options">
                <FontAwesomeIcon icon={faImage} className="icon" style={{ color: 'var(--accent-color)', cursor: 'pointer', marginRight: '15px' }} />
                <FontAwesomeIcon icon={faFaceSmile} className="icon" style={{ color: 'var(--accent-color)', cursor: 'pointer' }} />
              </div>
              <button className="post-btn" onClick={handleCreatePost}>Post</button>
            </div>
          </div>

          <div className="feed">
            {posts.map(post => (
              <Post key={post.id} post={post} onLike={handleLike} />
            ))}
          </div>
        </main>

        {/* Trending Sidebar */}
        <aside className="trending-container">
          <div className="trending-card">
            <h3>Trending Now</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '10px' }}>#GospelFunEvolution</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '10px' }}>#WebDevelopment</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '10px' }}>#ReactJS</p>
          </div>
          <div className="trending-card">
            <h3>Who to follow</h3>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
              <img src="https://i.pravatar.cc/150?u=sarah" alt="user" className="avatar" style={{ width: '35px', height: '35px' }} />
              <div>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Sarah Green</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>@sarah_g</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
