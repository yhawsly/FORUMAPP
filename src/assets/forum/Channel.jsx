import  { useState } from "react";

const MessageChannels = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);

  const messageChannels = [
    { id: 1, name: "General" },
    { id: 2, name: "Tech Talk" },
    { id: 3, name: "Funny Memes" },
  ];

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
    // Perform actions to join the channel 
  };

  return (
    <div>
      <h2>Message Channels</h2>
      <ul>
        {messageChannels.map((channel) => (
          <li
            key={channel.id}
            onClick={() => handleChannelClick(channel)}
            className={selectedChannel === channel ? "active" : ""}
          >
            {channel.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageChannels;
