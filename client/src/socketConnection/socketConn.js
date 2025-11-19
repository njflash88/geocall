import io from "socket.io-client";
import {
  onlineUsersHandler,
  userDisconnectedHandler,
} from "../store/actions/usersActions";
import { chatMessageHandler } from "../store/actions/messengerActions";

let socket = null;

export const connectWithSocketIOServer = () => {
  const socketServerUrl =
    import.meta.env.VITE_SOCKET_SERVER_URL || window.location.origin;
  // socket = io("http://localhost:3003");
  socket = io(socketServerUrl);

  console.log("CONNNECTING TO SOCKET SERVER...");
  socket.on("connect", () => {
    console.log(`connected to socket server : ${socket.id}`);
  });

  socket.on("online-users", (usersData) => {
    console.log("online-users: ", usersData);
    onlineUsersHandler(socket.id, usersData);
  });

  socket.on("chat-message", (messageData) => {
    // console.log("chat-message received: ", messageData);
    // Dispatch an action or handle the incoming chat message as needed
    chatMessageHandler(messageData);
  });

  socket.on("user-disconnected", (disconnectedUserSocketId) => {
    console.log("users-disconnected: ", disconnectedUserSocketId);
    userDisconnectedHandler(disconnectedUserSocketId);
  });
};

export const login = (data) => {
  console.log("emitting user-login event with data:", data);
  socket.emit("user-login", data);
};

export const sendChatMessage = (data) => {
  socket.emit("chat-message", data);
};
