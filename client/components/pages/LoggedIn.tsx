import * as React from "react";

import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

import _StdButton from "../Buttons/_StdButton";
import { Client, OrderFlow } from "../../utils/my-types";
import { useSelector } from "react-redux";
import DispatchUser from "./order/DispatchUser";

interface OrderOptionsProps {
  client: Client;
}

const Order: React.FC<OrderOptionsProps> = ({ client }) => {
  const sequence = useSelector(({ orderSequence }) => orderSequence);
  return sequence.flow === OrderFlow.NIL ? (
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
          client.order.transitToStack();
        }}
      ></_StdButton>
    </Grid>
  ) : sequence.flow === OrderFlow.ORDER ? (
    <DispatchUser client={client} />
  ) : sequence.flow === OrderFlow.FIND_STACK ? (
    <>Stack</>
  ) : (
    <></>
  );
};

export default Order;
