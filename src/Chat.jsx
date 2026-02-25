import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFaceSmile, faImage, faShare, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import EmojiPicker from './EmojiPicker';

const Chat = ({ messages, onSendMessage, onForwardMessage, currentUser }) => {
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
        <div className="chat-room">
            <div className="chat-header">
                <h2>Global Live Chat</h2>
                <span className="online-status">● Live</span>
            </div>

            <div className="messages-list">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message-bubble ${msg.user.name === currentUser.name ? 'sent' : 'received'}`}
                    >
                        {msg.user.name !== currentUser.name && (
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
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
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
    );
};

export default Chat;
