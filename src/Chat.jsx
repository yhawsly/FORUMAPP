import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFaceSmile, faImage, faShare, faArrowRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import EmojiPicker from './EmojiPicker';

const Chat = ({ messages, onSendMessage, onForwardMessage, onForwardToDM, currentUser, activeChatUser, onSwitchChat, availableUsers }) => {
    const [inputValue, setInputValue] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        onSendMessage(inputValue);
        setInputValue('');
    };

    const handleShare = (text) => {
        navigator.clipboard.writeText(text);
        alert('Message copied to clipboard!');
    };

    return (
        <div className="chat-layout">
            <aside className="chat-sidebar">
                <div style={{ padding: '15px', borderBottom: '1px solid var(--border-color)' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem' }}>Messages</h3>
                </div>
                <div className="contacts-list">
                    <div
                        className={`contact-item ${!activeChatUser ? 'active' : ''}`}
                        onClick={() => onSwitchChat(null)}
                    >
                        <div style={{ width: '40px', height: '40px', background: 'var(--accent-color)', borderRadius: '50%', marginRight: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>🌐</div>
                        <span>Global Chat</span>
                    </div>
                    {availableUsers.map(user => (
                        <div
                            key={user.name}
                            className={`contact-item ${activeChatUser?.name === user.name ? 'active' : ''}`}
                            onClick={() => onSwitchChat(user)}
                        >
                            <img src={user.avatar} className="avatar" style={{ width: '40px', height: '40px', marginRight: '12px', flexShrink: 0 }} />
                            <span>{user.name}</span>
                        </div>
                    ))}
                </div>
            </aside>

            <div className="chat-room" style={{ height: '100%', borderRadius: 0, border: 'none' }}>
                <div className="chat-header">
                    <h2>{activeChatUser ? activeChatUser.name : "Global Live Chat"}</h2>
                    <span className="online-status">● {activeChatUser ? "Private" : "Live"}</span>
                </div>

                <div className="messages-list">
                    {messages.length > 0 ? messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`message-bubble ${msg.user.name === currentUser.name ? 'sent' : 'received'}`}
                        >
                            {(msg.user.name !== currentUser.name && !activeChatUser) && (
                                <span className="sender-name">{msg.user.name}</span>
                            )}
                            <div className="bubble-content">
                                <p>{msg.text}</p>
                                <div className="message-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                                    <span className="message-time" style={{ margin: 0 }}>{msg.timestamp}</span>
                                    <div className="msg-actions" style={{ display: 'flex', gap: '8px', marginLeft: '10px' }}>
                                        <FontAwesomeIcon
                                            icon={faShare}
                                            style={{ fontSize: '0.7rem', cursor: 'pointer', opacity: 0.6 }}
                                            onClick={() => handleShare(msg.text)}
                                            title="Share/Copy"
                                        />
                                        <FontAwesomeIcon
                                            icon={faArrowRight}
                                            style={{ fontSize: '0.7rem', cursor: 'pointer', opacity: 0.6 }}
                                            onClick={() => onForwardMessage(msg.text)}
                                            title="Forward to Feed"
                                        />
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            style={{ fontSize: '0.7rem', cursor: 'pointer', opacity: 0.6 }}
                                            onClick={() => onForwardToDM && onForwardToDM(msg.text)}
                                            title="Forward to DM"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                            No messages yet. Say hi!
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className="chat-input-area" onSubmit={handleSubmit}>
                    <div className="input-actions" style={{ position: 'relative' }}>
                        <FontAwesomeIcon icon={faImage} className="icon" />
                        <FontAwesomeIcon
                            icon={faFaceSmile}
                            className="icon"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        />
                        {showEmojiPicker && (
                            <EmojiPicker
                                onSelect={(emoji) => {
                                    setInputValue(prev => prev + emoji);
                                    setShowEmojiPicker(false);
                                }}
                                onClose={() => setShowEmojiPicker(false)}
                            />
                        )}
                    </div>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" className="send-btn">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
