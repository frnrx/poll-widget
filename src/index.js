import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const WidgetDiv = document.querySelector(".poll_widget");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App domElement={WidgetDiv} />
  </React.StrictMode>
);
