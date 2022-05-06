import * as React from "react";

import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

import _StdButton from "../Buttons/_StdButton";
import { Client, TheState } from "../../utils/my-types";
import { useSelector } from "react-redux";

interface NotLoggedInProps {
  client: Client;
}

const NotLoggedIn: React.FC<NotLoggedInProps> = ({ client }) => {
  const [inputUsername, setInputUsername] = React.useState<string>("");
  const [inputPassword, setInputPassword] = React.useState<string>("");

  const authenticationMessage = useSelector(
    (state: TheState) => state.authenticationMessage
  );
  return (
    <>
      <Grid>
        <Grid>
          <TextField
            sx={{ py: 0, input: { color: "black" } }}
            label="username"
            value={inputUsername}
            variant="standard"
            onChange={(event) => {
              setInputUsername((_) => {
                return (event.target as HTMLInputElement).value;
              });
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="password"
            type="password"
            value={inputPassword}
            autoComplete="current-password"
            variant="standard"
            onChange={(event) => {
              setInputPassword((_) => {
                return (event.target as HTMLInputElement).value;
              });
            }}
          />
        </Grid>
        <_StdButton
          text={"Login"}
          onClickFn={() => {
            client.authentication.login(inputUsername, inputPassword);
          }}
        ></_StdButton>
      </Grid>
    </>
  );
};

export default NotLoggedIn;
