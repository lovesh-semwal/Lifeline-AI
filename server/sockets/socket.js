const connectedUsers = new Map();

const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`✅ User Connected: ${socket.id}`);

    /* =====================================
       Register User
    ===================================== */

    socket.on("register", (userId) => {
      connectedUsers.set(userId, socket.id);

      console.log(`User Registered: ${userId}`);
    });

    /* =====================================
       Emergency Alert
    ===================================== */

    socket.on("sendEmergency", (data) => {
      io.emit("receiveEmergency", data);

      console.log("Emergency Alert Sent");
    });

    /* =====================================
       AI Chat
    ===================================== */

    socket.on("sendMessage", (message) => {
      io.emit("receiveMessage", message);
    });

    /* =====================================
       Hospital Notification
    ===================================== */

    socket.on("hospitalAssigned", (data) => {
      io.emit("hospitalAssigned", data);
    });

    /* =====================================
       Blood Donor Notification
    ===================================== */

    socket.on("bloodRequest", (data) => {
      io.emit("bloodRequest", data);
    });

    /* =====================================
       Private Notification
    ===================================== */

    socket.on("privateNotification", ({ userId, data }) => {
      const socketId = connectedUsers.get(userId);

      if (socketId) {
        io.to(socketId).emit("notification", data);
      }
    });

    /* =====================================
       Disconnect
    ===================================== */

    socket.on("disconnect", () => {
      console.log(`❌ User Disconnected: ${socket.id}`);

      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          break;
        }
      }
    });
  });
};

export default initializeSocket;