// Authentication

import { Database } from "../../database/index.js";

import { invokeDeferredCallback } from "../../app/scheduler.js";
import { verifyToken } from "../../auth/crypt.js";

const timesUp = () => () => console.log("times up");
const deflateMinsToSeconds = (min) => min * 30;
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

    // Order
    socket.on(
      "request-add-order-to-new-stack",
      async ({ order, stackOptions }, token, chanSend) => {
        const [is, sub] = await verifyToken(token);
        const requestorName = await db.auth.getUsernameOfUserId(sub);

        if (!is) {
          return chanSend(null);
        }
        const { stackEndLocation, stackRadius, stackWindow } = stackOptions;

        const later = new Date();
        later.setSeconds(
          later.getSeconds() + deflateMinsToSeconds(stackWindow)
        );

        invokeDeferredCallback(later, timesUp());

        chanSend({
          orders: [
            {
              order,
              dropOffPoint: stackEndLocation,
              isCollected: false,
              username: requestorName,
            },
          ],
          config: {
            stackEndLocation,
            stackRadius,
            stackingTil: later.getTime(),
          },
        });
      }
    );
  });
};

export default bindEvents;
