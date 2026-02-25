import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCamera, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
        <div className="auth-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'var(--primary-bg)',
            color: 'white'
        }}>
            <div className="auth-card" style={{
                background: 'var(--secondary-bg)',
                padding: '40px',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '400px',
                border: '1px solid var(--border-color)',
                textAlign: 'center'
            }}>
                <h1 style={{ marginBottom: '10px' }}>Gospel Fun</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                    {isNewUser ? 'Create your profile to join the conversation' : 'Welcome back!'}
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ position: 'relative', marginBottom: '30px', display: 'inline-block' }}>
                        <img
                            src={avatar}
                            alt="Avatar preview"
                            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--accent-color)' }}
                        />
                        <label htmlFor="auth-avatar-upload" style={{
                            position: 'absolute',
                            bottom: '5px',
                            right: '5px',
                            background: 'var(--accent-color)',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}>
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

                    <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            What should we call you?
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 20px',
                                borderRadius: '12px',
                                background: 'var(--primary-bg)',
                                border: '1px solid var(--border-color)',
                                color: 'white',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                            required
                        />
                    </div>

                    <button type="submit" className="post-btn" style={{ width: '100%', padding: '15px', borderRadius: '12px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        <span>Join Gospel Fun</span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </form>

                <div style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    By joining, you agree to our Terms and Community Guidelines.
                </div>
            </div>
            <style>{`
                @media (max-width: 450px) {
                    .auth-card {
                        padding: 30px 20px !important;
                        border-radius: 0 !important;
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        border: none !important;
                    }
                    .auth-container {
                        align-items: flex-start !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Auth;
