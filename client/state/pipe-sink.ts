import { pingPipe } from "./general";
import { authenticationStatusPipe, authenticationMessagePipe } from "./authentication";

const pipeSink = {
  ping: pingPipe,
  authenticationStatus: authenticationStatusPipe,
  authenticationMessage: authenticationMessagePipe,
};

export default pipeSink;
