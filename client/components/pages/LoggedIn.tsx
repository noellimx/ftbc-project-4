import * as React from "react";

import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

import _StdButton from "../Buttons/_StdButton";
import {
  Client,
  OrderFlow,
  TheState,
  OrderSequence,
  Transition_DispatchUserOrder,
} from "../../utils/my-types";
import { useSelector } from "react-redux";
import DispatchUserOrdering from "./order/dispatchUser/DispatchUser";
import DispatchUserStacking from "./order/dispatchUser/DispatchUserStacking";

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
          client.order.transitToOrder_Ordering();
        }}
      ></_StdButton>
      <_StdButton
        text={"Find Stack"}
        onClickFn={() => {
          client.order.transitToStackFinding_();
        }}
      ></_StdButton>
    </Grid>
  ) : sequence.kind === OrderFlow.DISPATCH_USER_ORDER ? (
    sequence.transition === Transition_DispatchUserOrder.ORDERING ? (
      <DispatchUserOrdering client={client} />
    ) : sequence.transition === Transition_DispatchUserOrder.STACKING ? (
      <DispatchUserStacking client={client} />
    ) : (
      <>Unimplemented</>
    )
  ) : sequence.kind === OrderFlow.FIND_STACK ? (
    <>Stack</>
  ) : (
    <></>
  );
};

export default Order;
