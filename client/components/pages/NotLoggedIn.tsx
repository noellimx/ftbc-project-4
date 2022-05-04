import * as React from "react";

import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";

import { TrulyImpure, Client } from "../../utils/my-types";

interface StdButtonProps {
  onClickFn: TrulyImpure;
  text: string;
}
const StdButton: React.FC<StdButtonProps> = ({
  text,
  onClickFn = () => {},
}) => {
  return (
    <Button variant="outlined" disableElevation onClick={onClickFn}>
      {text}
    </Button>
  );
};

interface NotLoggedInProps {
  client: Client;
}

const NotLoggedIn: React.FC<NotLoggedInProps> = ({ client }) => {
  const [inputUsername, setInputUsername] = React.useState<string>("");
  const [inputPassword, setInputPassword] = React.useState<string>("");

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
              console.log("fired away");
              setInputPassword((_) => {
                return (event.target as HTMLInputElement).value;
              });
            }}
          />
        </Grid>
        <StdButton
          text={"Start"}
          onClickFn={() => {
            client.authentication.login(inputUsername, inputPassword);
          }}
        ></StdButton>
      </Grid>
    </>
  );
};

export default NotLoggedIn;
