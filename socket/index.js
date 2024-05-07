const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });

// const io = require("socket.io")(httpsServer, {
//     cors: {
//       origin: "https://chatapp-chinmay.vercel.app",
//       methods: ["GET", "POST"],
//       credentials:true
//     }
// });

let onlineUsers = [];

io.on("connection", (socket) => {
//   console.log("new socket", socket.id);

  //listen to a connection
  socket.on("addNewUser",(userId)=>{
    !onlineUsers.some(user => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id
      })
    // console.log(onlineUsers);
    io.emit("getOnlineUsers",onlineUsers);
  });

  //add message
  socket.on("sendMessage",(message)=>{
    const user = onlineUsers.find(user => user.userId === message.recipientId);
    if(user){
        io.to(user.socketId).emit("getMessage",message);
    }
  })

  socket.on("disconnect", ()=>{
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
    io.emit("getOnlineUsers",onlineUsers);
  })
});

io.listen(3000);