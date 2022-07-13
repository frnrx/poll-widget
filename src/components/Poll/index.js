import React, { useState } from "react";

const setNewPollData = (question, answersRaw) => {
  const savedData = JSON.parse(localStorage.getItem(question));

  if (savedData) return savedData;

  const pollData = {
    question,
    answers: answersRaw
      .split("|")
      .map((answer) => ({ option: answer, votes: 0 })),
    totalVotes: 0,
  };

  localStorage.setItem(question, JSON.stringify(pollData));

  return pollData;
};

const Poll = ({ question, answersRaw }) => {
  const [pollData, setPollData] = useState(
    setNewPollData(question, answersRaw)
  );
  const [userVoteOption, setUserVoteOption] = useState();

  const handleVote = (voteAnswer) => {
    const { answers, totalVotes } = pollData;
    let newVoteCount = Number(totalVotes);
    const newAnswers = answers.map((answer) => {
      if (answer.option === voteAnswer) {
        answer.votes++;
        newVoteCount++;
      }
      return answer;
    });

    setUserVoteOption(voteAnswer);
    setPollData((prevState) => ({
      ...prevState,
      answers: newAnswers,
      totalVotes: newVoteCount,
    }));

    localStorage.setItem(
      pollData.question,
      JSON.stringify({
        question: pollData.question,
        answers: newAnswers,
        totalVotes: newVoteCount,
      })
    );
  };

  if (!pollData) return null;

  return (
    <div className="poll_container">
      <p className="poll_question">{pollData.question}</p>
      {pollData?.answers?.map((answer) => {
        const userHasVoted = !!userVoteOption;
        const isThisOptionSelected = userVoteOption === answer.option;
        const votePercentage = `${parseInt(
          (answer.votes / pollData.totalVotes) * 100
        )}%`;

        return (
          <div className="poll_answer_container" key={answer.option}>
            <button
              className={
                isThisOptionSelected
                  ? "poll_voted_answer"
                  : userHasVoted
                  ? "poll_unvoted_answer"
                  : "poll_answer_default"
              }
              onClick={() => handleVote(answer.option)}
              disabled={userHasVoted}
            >
              <div
                className="poll_answer_progress"
                style={{
                  width: userHasVoted ? votePercentage : 0,
                  backgroundColor: isThisOptionSelected ? "#faa523" : "#d3d3d3",
                }}
              />
              {isThisOptionSelected && "✔ "}
              {answer.option}
              {userHasVoted && " " + votePercentage}
            </button>
          </div>
        );
      })}
      <p>Votes {pollData.totalVotes}</p>
    </div>
  );
};

export default Poll;
