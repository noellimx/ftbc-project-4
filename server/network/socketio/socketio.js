import bindSocketProj3Events from "./io-proj-3.js";

export default (io) => {
  io.on("connection", (socket) => {
    console.log(`[io.on connection] new socket connected ${socket.id}`);

    const cookie = socket.handshake.headers.cookie;
    console.log(`[io.on connection] cookie ${cookie}`);
    bindSocketProj3Events(socket, io);
  });
};
