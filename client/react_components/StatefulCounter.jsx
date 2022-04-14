import React from "react";
import { useState } from "react";

export default () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);

  return (
    <div style={{ border: "1px solid black" }} onClick={increment}>
      {" "}
      Stateful Count {count}
    </div>
  );
};
