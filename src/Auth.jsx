import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Auth = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('https://i.pravatar.cc/150?u=' + Math.random());
    const [isNewUser, setIsNewUser] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onLogin({
            name: name,
            avatar: avatar,
            bio: "Joined Gospel Fun recently!"
        });
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatar(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Gospel Fun</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                    {isNewUser ? 'Create your profile to join the conversation' : 'Welcome back!'}
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="auth-avatar-container">
                        <img
                            src={avatar}
                            alt="Avatar preview"
                            className="auth-avatar-preview"
                        />
                        <label htmlFor="auth-avatar-upload" className="auth-avatar-upload-label">
                            <FontAwesomeIcon icon={faCamera} style={{ fontSize: '0.8rem' }} />
                        </label>
                        <input
                            id="auth-avatar-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleAvatarUpload}
                        />
                    </div>

                    <div className="auth-input-group">
                        <label className="auth-label">
                            What should we call you?
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="auth-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="post-btn" style={{ width: '100%', padding: '15px', borderRadius: '12px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        <span>Join Gospel Fun</span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </form>

                <div className="auth-footer">
                    By joining, you agree to our Terms and Community Guidelines.
                </div>
            </div>
        </div>
    );
};

export default Auth;
