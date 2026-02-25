import { useState } from 'react';

const EMOJI_LIST = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
    '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
    '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯',
    '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
    '🥴', '🤢', '🤮', '🤧', '🤨', '🧐', '👋', '🤚', '🖐', '✋',
    '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈',
    '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛',
    '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳',
    '💪', '🦾', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍',
    '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝',
    '🔥', '✨', '🌟', '⭐', '🌈', '☁️', '☀️', '⚽', '🎨', '🎬'
];

const EmojiPicker = ({ onSelect, onClose }) => {
    return (
        <div className="emoji-picker-popover" style={{
            position: 'absolute',
            bottom: '50px',
            left: '0',
            background: 'var(--secondary-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '10px',
            zIndex: 1001,
            width: '240px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(8, 1fr)',
                gap: '5px',
                maxHeight: '200px',
                overflowY: 'auto',
                paddingRight: '5px'
            }}>
                {EMOJI_LIST.map((emoji, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(emoji)}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            padding: '5px',
                            borderRadius: '5px',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'var(--hover-bg)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
            <div style={{ marginTop: '10px', textAlign: 'right' }}>
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-color)',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default EmojiPicker;
