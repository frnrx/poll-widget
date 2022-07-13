import React from "react";
import Poll from "./components/Poll";
import "./index.css";

const App = ({ domElement }) => {
  let pollDataRaw = [];

  const getPollData = (questionNumber = 1) => {
    const newQuestion = domElement.getAttribute(
      `data-question${questionNumber}`
    );
    const newAnswers = domElement.getAttribute(
      `data-answer-options${questionNumber}`
    );

    if (!newQuestion || !newAnswers) return;

    pollDataRaw.push({ question: newQuestion, answersRaw: newAnswers });

    getPollData(questionNumber + 1, pollDataRaw);
  };

  getPollData();

  if (!pollDataRaw.length) return null;

  return <Poll pollDataRaw={pollDataRaw} />;
};

export default App;
