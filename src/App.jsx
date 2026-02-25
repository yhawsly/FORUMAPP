import './App.css';
import { useState, useEffect, useMemo } from 'react';
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
  faCommentDots,
  faCamera,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import Post from './Post';
import Chat from './Chat';
import Auth from './Auth';
import EmojiPicker from './EmojiPicker';

const DEFAULT_POSTS = [
  {
    id: 1,
    user: {
      name: "Hedy Lamarr",
      avatar: "https://i.imgur.com/yXOvdOSs.jpg",
    },
    content: "Just started exploring the new Gospel Fun Forum! The layout is looking amazing. #Tech #Social",
    timestamp: "10:15 AM",
    likes: 12,
    comments: [],
    retweets: 2,
    isLiked: false
  },
  {
    id: 2,
    user: {
      name: "Greg Smith",
      avatar: "https://i.pravatar.cc/150?u=greg",
    },
    content: "Does anyone have recommendations for good community management tools? 🛠️ #Community #Tools",
    timestamp: "09:42 AM",
    likes: 8,
    comments: [],
    retweets: 1,
    isLiked: false
  },
];

const DEFAULT_MESSAGES = [
  {
    id: 1,
    user: { name: "Adonai", avatar: "https://i.pravatar.cc/150?u=adonai" },
    text: "Welcome to the global chat everyone! 🙏",
    timestamp: "10:30 AM"
  },
  {
    id: 2,
    user: { name: "Sarah Green", avatar: "https://i.pravatar.cc/150?u=sarah" },
    text: "Thanks! Great to see this live.",
    timestamp: "10:32 AM"
  }
];

function App() {
  // Persistence Initialization
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('gospel_posts');
    return saved ? JSON.parse(saved) : DEFAULT_POSTS;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('gospel_messages');
    return saved ? JSON.parse(saved) : DEFAULT_MESSAGES;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gospel_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('gospel_user');
  };

  const [newPostContent, setNewPostContent] = useState('');
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('gospel_theme') || 'dark';
  });

  const [directMessages, setDirectMessages] = useState(() => {
    const saved = localStorage.getItem('gospel_dms');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeChatUser, setActiveChatUser] = useState(null); // null means Global Chat

  const handleStartDM = (user) => {
    if (user.name === currentUser.name) return;
    setActiveChatUser(user);
    setActiveTab('Chat');
  };

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('gospel_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('gospel_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('gospel_dms', JSON.stringify(directMessages));
  }, [directMessages]);

  useEffect(() => {
    localStorage.setItem('gospel_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('gospel_theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Dynamic Trending Logic
  const trendingTopics = useMemo(() => {
    const hashtags = {};
    posts.forEach(post => {
      const found = post.content.match(/#\w+/g);
      if (found) {
        found.forEach(tag => {
          hashtags[tag] = (hashtags[tag] || 0) + 1;
        });
      }
    });
    return Object.entries(hashtags)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [posts]);

  const getFormattedTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim() && !postImage) return;

    const newPost = {
      id: Date.now(),
      user: { name: currentUser.name, avatar: currentUser.avatar },
      content: newPostContent,
      image: postImage,
      timestamp: getFormattedTime(),
      likes: 0,
      comments: [],
      retweets: 0,
      isLiked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setPostImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleForwardMessage = (text) => {
    setNewPostContent(text);
    setActiveTab('Home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComment = (postId, text) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          user: { name: currentUser.name, avatar: currentUser.avatar },
          text: text,
          timestamp: getFormattedTime()
        };
        return {
          ...post,
          comments: [...(post.comments || []), newComment]
        };
      }
      return post;
    }));
  };

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      user: { name: currentUser.name, avatar: currentUser.avatar },
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (activeChatUser) {
      const chatKey = [currentUser.name, activeChatUser.name].sort().join('_');
      setDirectMessages({
        ...directMessages,
        [chatKey]: [...(directMessages[chatKey] || []), newMessage]
      });
    } else {
      setMessages([...messages, newMessage]);
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  // Filtered Posts for Explore/Search
  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    return posts.filter(post =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-left">
          <h1>Gospel Fun</h1>
        </div>
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Search for topics, people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="nav-right">
          <FontAwesomeIcon icon={faBell} className="icon" style={{ cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => setActiveTab('Notifications')} />
          <img
            src={currentUser.avatar}
            className="avatar"
            style={{ width: '32px', height: '32px', marginLeft: '15px', cursor: 'pointer' }}
            onClick={() => setActiveTab('Profile')}
          />
        </div>
      </nav>

      <div className="app-container">
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
          <div className={`nav-item ${activeTab === 'Chat' ? 'active' : ''}`} onClick={() => setActiveTab('Chat')}>
            <FontAwesomeIcon icon={faCommentDots} className="icon" />
            <span>Chat</span>
          </div>
          <div className={`nav-item ${activeTab === 'Profile' ? 'active' : ''}`} onClick={() => setActiveTab('Profile')}>
            <FontAwesomeIcon icon={faUser} className="icon" />
            <span>Profile</span>
          </div>
          <div className={`nav-item ${activeTab === 'Settings' ? 'active' : ''}`} onClick={() => setActiveTab('Settings')}>
            <FontAwesomeIcon icon={faGear} className="icon" />
            <span>Settings</span>
          </div>
          <div className="nav-item" onClick={handleLogout} style={{ color: '#ff4b4b', marginTop: 'auto' }}>
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
            <span>Logout</span>
          </div>
        </aside>

        <main className="feed-container">
          {activeTab === 'Home' && (
            <>
              <div className="create-post">
                <textarea
                  placeholder="What's on your mind?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
                {postImage && (
                  <div className="image-preview" style={{ position: 'relative', marginBottom: '15px' }}>
                    <img src={postImage} alt="preview" style={{ width: '100%', borderRadius: '12px' }} />
                    <button
                      onClick={() => setPostImage(null)}
                      style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}
                    >✕</button>
                  </div>
                )}
                <div className="create-post-actions">
                  <div className="media-options">
                    <label htmlFor="post-image-upload">
                      <FontAwesomeIcon icon={faImage} className="icon" style={{ color: 'var(--accent-color)', cursor: 'pointer', marginRight: '15px' }} />
                    </label>
                    <input
                      id="post-image-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageUpload}
                    />
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <FontAwesomeIcon
                        icon={faFaceSmile}
                        className="icon"
                        style={{ color: 'var(--accent-color)', cursor: 'pointer' }}
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      />
                      {showEmojiPicker && (
                        <EmojiPicker
                          onSelect={(emoji) => {
                            setNewPostContent(prev => prev + emoji);
                            setShowEmojiPicker(false);
                          }}
                          onClose={() => setShowEmojiPicker(false)}
                        />
                      )}
                    </div>
                  </div>
                  <button className="post-btn" onClick={handleCreatePost}>Post</button>
                </div>
              </div>

              <div className="feed">
                {posts.map(post => (
                  <Post key={post.id} post={post} onLike={handleLike} onComment={handleComment} />
                ))}
              </div>
            </>
          )}

          {activeTab === 'Chat' && (
            <Chat
              messages={messages}
              onSendMessage={handleSendMessage}
              onForwardMessage={handleForwardMessage}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'Explore' && (
            <div className="explore-view">
              <h2>Explore</h2>
              <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
                {['For You', 'Trending', 'News', 'Sports', 'Entertainment'].map(cat => (
                  <span key={cat} style={{ background: 'var(--hover-bg)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', cursor: 'pointer' }}>{cat}</span>
                ))}
              </div>
              <div className="feed">
                {filteredPosts.map(post => (
                  <Post key={post.id} post={post} onLike={handleLike} onComment={handleComment} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="notifications-view">
              <h2>Notifications</h2>
              <div style={{ marginTop: '20px' }}>
                {[
                  { user: "Sarah Green", type: "liked your post", time: "5m ago" },
                  { user: "Greg Smith", type: "commented: 'Great job!'", time: "1h ago" },
                  { user: "Adonai", type: "followed you", time: "2h ago" },
                ].map((notif, idx) => (
                  <div key={idx} style={{ padding: '15px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '10px', height: '10px', background: 'var(--accent-color)', borderRadius: '50%', marginRight: '15px' }}></div>
                    <p style={{ margin: 0 }}><strong>{notif.user}</strong> {notif.type} <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{notif.time}</span></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Settings' && (
            <div className="settings-view">
              <h2>Settings</h2>
              <div style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
                  <h3>Appearance</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                    <div
                      onClick={handleThemeToggle}
                      style={{
                        width: '40px',
                        height: '20px',
                        background: 'var(--accent-color)',
                        borderRadius: '20px',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'background 0.3s'
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        background: 'white',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '2px',
                        transition: 'left 0.3s',
                        left: theme === 'dark' ? '22px' : '2px'
                      }}></div>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
                  <h3>Account</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email: user@example.com</p>
                  <button className="post-btn" style={{ background: 'var(--hover-bg)', color: 'white', marginTop: '10px' }}>Change Password</button>
                </div>
                <button
                  className="post-btn"
                  style={{ background: '#ff4b4b' }}
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Reset All Data (Local Storage)
                </button>
              </div>
            </div>
          )}

          {activeTab === 'Profile' && (
            <div className="profile-edit-view" style={{ padding: '20px', backgroundColor: 'var(--secondary-bg)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h2>Edit Profile</h2>
              <div style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={currentUser.avatar} className="avatar" style={{ width: '100px', height: '100px' }} />
                    <label htmlFor="avatar-upload" style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--accent-color)', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>
                      <FontAwesomeIcon icon={faCamera} style={{ color: 'white' }} />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setCurrentUser({ ...currentUser, avatar: reader.result });
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                  <div style={{ marginLeft: '25px' }}>
                    <h3>{currentUser.name}</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Update your profile details</p>
                  </div>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Display Name</label>
                  <input
                    type="text"
                    value={currentUser.name}
                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--primary-bg)', border: '1px solid var(--border-color)', color: 'white' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Bio</label>
                  <textarea
                    value={currentUser.bio}
                    onChange={(e) => setCurrentUser({ ...currentUser, bio: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--primary-bg)', border: '1px solid var(--border-color)', color: 'white', minHeight: '80px', resize: 'none' }}
                  />
                </div>
                <button
                  className="post-btn"
                  style={{ marginTop: '20px' }}
                  onClick={() => {
                    setActiveTab('Home');
                    alert('Profile updated successfully!');
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab !== 'Home' && activeTab !== 'Chat' && activeTab !== 'Explore' && activeTab !== 'Profile' && (
            <div className="placeholder-view">
              <h2>{activeTab} View</h2>
              <p>This section is coming soon!</p>
            </div>
          )}
        </main>

        <aside className="trending-container">
          <div className="trending-card">
            <h3>Trending Now</h3>
            {trendingTopics.length > 0 ? trendingTopics.map(([tag, count]) => (
              <div key={tag} style={{ marginBottom: '12px', cursor: 'pointer' }} onClick={() => {
                setSearchQuery(tag);
                setActiveTab('Explore');
              }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{tag}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{count} posts</span>
              </div>
            )) : <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>None yet. Use #hashtags!</p>}
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
