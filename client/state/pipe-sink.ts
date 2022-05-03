import { pingPipe } from "./general";
import { authenticationStatusPipe } from "./authentication";

const pipeSink = {
  ping: pingPipe,
  authenticationStatus: authenticationStatusPipe
};

export default pipeSink;
