import React from "react";
import Spinner from "./Spinner";
import "./Overlay.css";

function Overlay({ children, isLoading }) {
  return (
    <>
      {isLoading && (
        <Spinner />
      )}
      {children}
    </>
  );
}

export default Overlay;