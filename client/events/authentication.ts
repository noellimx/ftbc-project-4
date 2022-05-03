import {
  UpLinkSub,
  ChannelReceive,
  SioResponse,
  EventTrigger,
  TrulyImpure,
  AuthenticationTrigger,
} from "../utils/my-types";
import { getAccessToken } from "../operations/authentication";


const uplinkAuthentication: UpLinkSub<AuthenticationTrigger> = (io, store) => {
  console.log("[uplinkAuthentication] attaching");

  const isValidToken = (chanRcv: ChannelReceive<SioResponse>) => {
    const token = getAccessToken();
    io.emit("is-token-valid", token, (response: SioResponse) => {
      chanRcv(response);
    });
  };

  const updateValidToken = () => {
    isValidToken(() => {});
  };

  return {
    updateValidToken,
  };
};

export default uplinkAuthentication;
