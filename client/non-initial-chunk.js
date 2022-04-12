import React from "react";
import data from "./data/data.json";

import a, * as some from "./alt.css";
import moment from "moment";

console.log(a);
console.log(some);

export default (
  <ul>
    {data.items.map((item) => {
      return (
        <li
          key={item.id}
          className={item.id % 2 === 0 ? "grey--" : "white--"}
          style={
            item.id % 2 === 0
              ? { backgroundColor: "gray" }
              : { backgroundColor: "white" }
          }
        >
          {/* {Object.entries(item).map((entry) => {
        const [attribute, value] = entry;
        return <p key={attribute + value}>{attribute}: {value}</p>
      })} */}

          <p>id: {item.id}</p>
          <p>name : {item.name}</p>
          <p>description: {item.description}</p>
          <p>createdAt: {moment(item.createdAt).toNow()}</p>
          <p>updateAt: {moment(item.updatedAt).toNow()}</p>
        </li>
      );
    })}
  </ul>
);
