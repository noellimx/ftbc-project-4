import * as React from "react";

import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

import _StdButton from "../Buttons/_StdButton";
import {
  Client,
  OrderFlow,
  TheState,
  OrderSequence,
} from "../../utils/my-types";
import { useSelector } from "react-redux";
import DispatchUser from "./order/dispatchUser/DispatchUser";

interface OrderOptionsProps {
  client: Client;
}

const Order: React.FC<OrderOptionsProps> = ({ client }) => {
  const sequence: OrderSequence = useSelector(
    (state: TheState) => state.orderSequence
  );
  return sequence.kind === OrderFlow.NIL ? (
    <Grid>
      <_StdButton
        text={"Order"}
        onClickFn={() => {
          client.order.transitToOrder();
        }}
      ></_StdButton>
      <_StdButton
        text={"Find Stack"}
        onClickFn={() => {
          client.order.transitToStackFinding();
        }}
      ></_StdButton>
    </Grid>
  ) : sequence.kind === OrderFlow.DISPATCH_USER_ORDER ? (
    <DispatchUser client={client} />
  ) : sequence.kind === OrderFlow.FIND_STACK ? (
    <>Stack</>
  ) : (
    <></>
  );
};

export default Order;
