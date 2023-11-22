import { useState } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

const EmojiPicker = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setChosenEmoji(emoji.native);
    setShowPicker(false);
  };

  return (
    <div>
      <h2>Emoji Picker</h2>
      <div>
        <span onClick={handleEmojiClick} style={{ cursor: 'pointer' }}>
          {chosenEmoji ? (
            <span role="img" aria-label="Selected Emoji">
              {chosenEmoji}
            </span>
          ) : (
            'Click to Pick Emoji'
          )}
        </span>
        {showPicker && (
          <Picker
            style={{ position: 'absolute', bottom: '40px', left: '0' }}
            onSelect={handleEmojiSelect}
          />
        )}
      </div>
      {chosenEmoji && (
        <div>
          <p>You have selected: {chosenEmoji}</p>
          {}
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
