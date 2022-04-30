import express from "express";
import cookieParser from "cookie-parser";
import bindRoutes from "./network/http.js";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import bindEvents from "./network/socketio/socketio.js";

const SERVER_LISTENING_PORT = process.env.PORT || 3004;
const app = express(); // framework
const server = http.createServer(app); // communications
const io = new Server(server); // upgrade / mounting

app.use(cors({ origin: "*" }));

app.use(express.static("dist"));
app.use(cookieParser());

// await seed();

bindRoutes(app);

// bindEvents(io);

server.listen(SERVER_LISTENING_PORT, () => {
  console.log(`Server listening ${SERVER_LISTENING_PORT}`);
});
