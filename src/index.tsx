import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Board from "./components/Board/Board";

const root = ReactDOM.createRoot(document.getElementById("root") as any);

root.render(
  <StrictMode>
    <Board></Board>
  </StrictMode>
);
