import React, { useState, createContext } from "react";

export const TwaliContext = createContext(undefined);

export default function TwaliProvider(props) {
  const [identity, setIdentity] = useState();

  return (
    <TwaliContext.Provider value={{ identity, setIdentity }}>
      {props.children}
    </TwaliContext.Provider>
  );
}
