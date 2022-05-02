import * as React from "react";

import { useSelector } from "react-redux";

import { TheState } from "../utils/my-types";

interface AppProps {}
export const App: React.FC<AppProps> = () => {
  const countOfPing = useSelector((state: TheState) => state.ping);

  return <>The Server Pinged {countOfPing} Times</>;
};
