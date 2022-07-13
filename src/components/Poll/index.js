import React, { useState } from "react";

const setNewPollData = (pollDataRaw) =>
  pollDataRaw.map(({ question, answersRaw }, index) => {
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
  });

const Poll = ({ pollDataRaw }) => {
  const pollData = setNewPollData(pollDataRaw);

  const [step, setStep] = useState(0);
  const [userVoteOption, setUserVoteOption] = useState();
  const userHasVoted = !!userVoteOption;
  const isLastOne = step + 1 === pollData.length;

  const handleVote = (voteAnswer, question) => {
    const { answers, totalVotes } = pollData[step];
    let newVoteCount = Number(totalVotes);
    const newAnswers = answers.map((answer) => {
      if (answer.option === voteAnswer) {
        answer.votes++;
        newVoteCount++;
      }
      return answer;
    });

    setUserVoteOption(voteAnswer);

    localStorage.setItem(
      question,
      JSON.stringify({
        question: question,
        answers: newAnswers,
        totalVotes: newVoteCount,
      })
    );
  };

  const handleClose = () => {
    setStep((prevState) => prevState + 1);
    setUserVoteOption(null);
  };

  if (!pollData || !pollData.length) return null;

  const renderPoll = () => {
    const { question, answers, totalVotes } = pollData[step];
    return (
      <div className="poll_container">
        <p className="poll_question">{question}</p>
        {answers?.map((answer) => {
          const isThisOptionSelected = userVoteOption === answer.option;
          const votePercentage = `${parseInt(
            (answer.votes / totalVotes) * 100
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
                onClick={() => handleVote(answer.option, question)}
                disabled={userHasVoted}
              >
                <div
                  className="poll_answer_progress"
                  style={{
                    width: userHasVoted ? votePercentage : 0,
                    backgroundColor: isThisOptionSelected
                      ? "#faa523"
                      : "#d3d3d3",
                  }}
                />
                {isThisOptionSelected && "✔ "}
                {answer.option}
                {userHasVoted && " " + votePercentage}
              </button>
            </div>
          );
        })}
        <div className="poll_footer">
          <p className="vote_count">Votes {totalVotes}</p>
          {userHasVoted && (
            <button className="poll_next_question" onClick={handleClose}>
              {isLastOne ? "Close" : "Next question"}
            </button>
          )}
        </div>
      </div>
    );
  };

  while (step < pollData.length) {
    return renderPoll();
  }

  return null;
};

export default Poll;
