import React from "react";
import Chatbox from "./Chatbox/Chatbox";
import "./Messenger.css";
import { useSelector } from "react-redux";

// const DUMMY_CHATBOXES = [
//   { username: "Martin", socketId: 3123123, message: [] },
//   { username: "Alice", socketId: 1121124, message: [] },
//   { username: "Bob", socketId: 5888999, message: [] },
// ];

const Messenger = () => {
  const chatboxes = useSelector((state) => state.messenger.chatboxes);

  return (
    <div className="messenger_container">
      {chatboxes.map((chatbox) => (
        <Chatbox
          key={chatbox.socketId}
          socketId={chatbox.socketId}
          username={chatbox.username}
          message={chatbox.message}
        />
      ))}
    </div>
  );
};
export default Messenger;
