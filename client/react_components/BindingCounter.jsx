import React from "react";

export default () => {
  let count = 0;

  const increment = () => (count += 1);

  return (
    <div style={{ border: "1px solid black" }} onClick={increment}>
      {" "}
      Binded Count: {count}
    </div>
  );
};
