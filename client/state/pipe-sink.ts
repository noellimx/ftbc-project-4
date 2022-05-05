import { pingPipe } from "./general";
import {
  authenticationStatusPipe,
  authenticationMessagePipe,
} from "./authentication";
import { orderSequencePipe } from "./order";
const pipeSink = {
  ping: pingPipe,
  authenticationStatus: authenticationStatusPipe,
  authenticationMessage: authenticationMessagePipe,
  orderSequence: orderSequencePipe,
};

export default pipeSink;
