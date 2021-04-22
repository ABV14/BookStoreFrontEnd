import React, { createContext, useReducer } from "react";

let x;
if (!localStorage.getItem("token")) {
  x = ["", "Login", "Register","Cart"];
} else if (
  JSON.parse(localStorage.getItem("userdata")).userType === "Customer"
) {
  x = [
    "User",
    "Hey, " +
      JSON.parse(localStorage.getItem("userdata"))
        .userName.charAt(0)
        .toUpperCase() +
      JSON.parse(localStorage.getItem("userdata")).userName.slice(1),
    "",
    "Cart"
  ];
} else if (JSON.parse(localStorage.getItem("userdata")).userType === "Admin") {
  x = [
    "Admin",
    "Hey, " +
      JSON.parse(localStorage.getItem("userdata"))
        .userName.charAt(0)
        .toUpperCase() +
      JSON.parse(localStorage.getItem("userdata")).userName.slice(1),
    "",
    "",
  ];
}

const initialState = x;
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "action description":
        let newState = action.payload; // do something with the action
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
