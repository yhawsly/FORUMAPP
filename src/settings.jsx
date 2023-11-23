import  { useState } from 'react';

const Settings = () => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div>
      <button onClick={toggleSettings}>Settings</button>
      {showSettings && (
        <div>
          <h2>Settings Details</h2>
          {}
          <p>details</p>
          <p>developer</p>
          {}
        </div>
      )}
    </div>
  );
};

export default Settings;
