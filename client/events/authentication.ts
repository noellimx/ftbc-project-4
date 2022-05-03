import {
  UpLinkSub,
  ChannelReceive,
  SioResponse,
  AuthenticationTrigger,
  AuthenticationStatus,
} from "../utils/my-types";
import { getAccessToken } from "../operations/authentication";
import { authenticationStatuInjector } from "../state/authentication";


const uplinkAuthentication: UpLinkSub<AuthenticationTrigger> = (io, store) => {
  console.log("[uplinkAuthentication] attaching");

  const isValidToken = (chanRcv: ChannelReceive<boolean>) => {
    const token = getAccessToken();
    console.log(`[isValidToken] sending token -> ${token}`)
    io.emit("is-token-valid", token, (response: boolean) => {
      console.log(`[is-token-valid] := ${response}`);
      chanRcv(response);
    });
  };

  const updateValidToken = () => {
    isValidToken(() => {});
  };

  const presentToken = (n = 5) => {
    if(n == 0) {

      console.error("Server not responding regularly to authentication protocol.")
      return;
    };
    isValidToken((is) => {
      if(is === true) {
        store.dispatch(authenticationStatuInjector(AuthenticationStatus.TRUE));
      }else if(is === false){
        store.dispatch(authenticationStatuInjector(AuthenticationStatus.FALSE));
      }else {
        setTimeout( 
          () => {
            store.dispatch(
              authenticationStatuInjector(AuthenticationStatus.UNCERTAIN)
            );
            presentToken(n - 1);}
          
          ,1000);
      }
    })
  }

  return {
    updateValidToken,
    presentToken,
  };
};

export default uplinkAuthentication;
