// Authentication

import { Database } from "../../database/index.js";

/**
 * @param {any} io ss
 * @param {Database} db
 */
const bindEvents = (io, db) => {
  io.on("connection", (socket) => {
    console.log("[io] socket connected");

    // General
    socket.emit("copy", 0);
    socket.on("do-you-acknowledge", (chanSend) => chanSend("acknowledged"));

    // Authentication
    socket.on("is-token-valid", async (token, chanSend) => {
      console.log(`[isTokenValid] ?= ${token}`);
      db.auth.isVerifiedToken(token).then(chanSend);
    });

    socket.on("login-request", async (credentials, resCb) => {
      const { username, password } = credentials;
      console.log("[socket.on login - request] Getting access token. . . ");

      const { accessToken, msg } = await db.auth.getAccessToken({
        username,
        password,
      });

      console.log(
        `[socket.on login - request] access ${JSON.stringify(
          accessToken
        )} msg ${msg}`
      );
      resCb({ accessToken, msg });
    });
  });
};

export default bindEvents;
