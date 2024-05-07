const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5000" });

io.on("connection", (socket) => {
  console.log("new socket", socket.id);

  //listen to a connection
  socket.on("addNewUser",(userId)=>{
    onlineUsers.some(user => user.userId === userId);
    onlineUsers.push({
        userId,
        socketId: socket.id
    })
  })
});

io.listen(3000);