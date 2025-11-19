import React, { useState } from "react";
import  {sendChatMessage} from "../../store/actions/messengerActions"
import { useSelector } from "react-redux";

const NewMessage = ({ socketId }) => {
   const [message, setMessage] = useState("");
   const [inputDisabled, setInputDisabled] = useState(false);

   const onlineUsers = useSelector((state) => state.map.onlineUsers);

   const handleMessageValueChange = (event) => {
      setMessage(event.target.value);
   }
   const handleKeyPressed = (event) => {
      if ((event.code === "Enter" || event.key === "Enter") && message.length > 0) {
         proceedChatMesssage();
         setMessage("");
      }
   }
   const proceedChatMesssage = () => {
      if (onlineUsers.find((user) => user.socketId === socketId)) {
         sendChatMessage(socketId, message);
      } else {
         setInputDisabled(true);
      }
   }

   return (
      <div className="chatbox_new_message_container">
         <input
            className="chatbox_new_message_input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={handleMessageValueChange}
            onKeyDown={handleKeyPressed}
            disabled={inputDisabled}
         />
      </div>
   )
};

export default NewMessage;