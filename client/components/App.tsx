import * as React from "react";

import { useSelector } from "react-redux";

import { TheState, AuthenticationStatus, Client } from "../utils/my-types";
import LoggedIn from "./pages/LoggedIn";
import NotLoggedIn from "./pages/NotLoggedIn";

interface AppProps {
  client: Client;
}

const App: React.FC<AppProps> = ({ client }) => {
  const countOfPing = useSelector((state: TheState) => state.ping);
  const authenticationStatus = useSelector<TheState, AuthenticationStatus>(
    (state) => state.authenticationStatus
  );

  React.useEffect(() => {
    client.authentication.presentToken();
  }, []);

  return (
    <>
      <>The Server Pinged {countOfPing} Times</>

      <>
        {authenticationStatus === AuthenticationStatus.UNCERTAIN ? (
          <div>Uncertain User</div>
        ) : authenticationStatus === AuthenticationStatus.FALSE ? (
          <NotLoggedIn client={client} />
        ) : authenticationStatus === AuthenticationStatus.TRUE ? (
          <LoggedIn client={client} />
        ) : (
          <></>
        )}
      </>
    </>
  );
};

export default App;
