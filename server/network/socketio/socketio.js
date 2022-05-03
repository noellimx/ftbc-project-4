

export default (io) => {
  io.on("connection", (socket) => {
    console.log("[io] socket connected");

    // General
    socket.emit("copy", 0);
    socket.on("do-you-acknowledge", (chanSend) => chanSend("acknowledged"));

    // Authentication
    socket.on("is-token-valid", async (token, chanSend) => {
      console.log(`[isTokenValid] ?= ${token}`);
      chanSend("aa");
    });
  });
};
