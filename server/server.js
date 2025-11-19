const express = require("express");
const path = require("path"); // GC added
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { disconnect } = require("process");

const server = http.createServer(app);
app.use(express.static(path.join(__dirname, "client/dist"))); // GC added
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    // origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  // transports: ['websocket', 'polling']
});

app.get("/", (req, res) => {
  res.send("Hello server is started");
});

let onlineUsers = {};

io.on("connection", (socket) => {
  console.log(`user connected with id : ${socket.id}`);

  socket.on("user-login", (data) => loginEventHandler(socket, data));

  socket.on("chat-message", (data) => chatMessageHandler(socket, data));

  socket.on("disconnect", () => {
    disconnectEventHandler(socket.id);
  });
});

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
});

const disconnectEventHandler = (id) => {
  console.log(`user disconnected : ${id}`);
  removeOnlineUser(id);
  broadcastDisconnectedUserDetails(id);
};

const chatMessageHandler = (socket, data) => {
  const { receiverSocketId, content, id } = data;

  if (onlineUsers[receiverSocketId]) {
    console.log("message received");
    console.log("sending message to other user");

    io.to(receiverSocketId).emit("chat-message", {
      senderSocketId: socket.id,
      content,
      id,
    });
  }
};

const removeOnlineUser = (id) => {
  if (onlineUsers[id]) {
    delete onlineUsers[id];
  }
  console.log("online users removed:", onlineUsers);
};

const broadcastDisconnectedUserDetails = (disconnectedUserSocketId) => {
  io.to("logged-users").emit("user-disconnected", disconnectedUserSocketId);
};

const loginEventHandler = (socket, data) => {
  socket.join("logged-users");

  onlineUsers[socket.id] = {
    username: data.username,
    coords: data.coords,
  };
  console.log("online users:", onlineUsers);
  io.to("logged-users").emit("online-users", convertOnlineUsersToArray());
};

const convertOnlineUsersToArray = () => {
  const onlineUsersArray = [];

  Object.entries(onlineUsers).forEach(([key, value]) => {
    onlineUsersArray.push({
      socketId: key,
      username: value.username,
      coords: value.coords,
    });
  });
  return onlineUsersArray;
};
