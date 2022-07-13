import React from "react";
import Poll from "./components/Poll";
import "./index.css";

const App = ({ domElement }) => {
  const question = domElement.getAttribute("data-question");
  const answersRaw = domElement.getAttribute("data-answer-options");

  return <Poll question={question} answersRaw={answersRaw} />;
};

export default App;
