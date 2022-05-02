import { pingReceived } from "../state/general";
import { Socket } from "socket.io-client";
import { Store } from "redux";

const uplinkGeneral = (io: Socket, store: Store) => {
  console.log("uplinkGeneral....");
  io.on("copy", (flag) => {
    console.log(`[uplinkGeneral ping] copy := ${flag}`);
    store.dispatch(pingReceived());
  });
};

export default uplinkGeneral;
