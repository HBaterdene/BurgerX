import React, { useState } from "react";

const myReducer = (state = 0, action) => {
  if (action.type === "INCREMENT") {
    return { value: state.value + 1 };
  } else if (action.type === "DECREMENT") {
    return { value: state.value - 1 };
  }
};

const MyRedux = (props) => {
  const [value, setValue] = useState(0);

  dispatch = (action) => {
    setState((prevState) => myReducer(prevState));
  };

  const increment = () => {
    const action = {
      type: "INCREMENT",
    };

    dispatch(action);
  };
  const decrement = () => {
    const action = {
      type: "DECREMENT",
    };

    dispatch(action);
  };

  return (
    <div>
      Counter: {value}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};

export default MyRedux;
