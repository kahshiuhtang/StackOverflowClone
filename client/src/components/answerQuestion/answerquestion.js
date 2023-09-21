import React, { useState } from "react";
import "../../stylesheets/App.css";
import postAnswer from "./postAnswer";
export default function AnswerQuestion({
  model,
  setModel,
  setter,
  qid,
  uid,
  username,
}) {
  const [answer, setAnswer] = useState("");
  const [answerErr, setAnswerErr] = useState(false);
  function setError(err) {
    if (err === "answer") {
      setAnswerErr(true);
    }
  }
  function resetError(err) {
    setAnswerErr(false);
  }
  return (
    <div id="answer-questions" className="main">
      <h2>Enter Answer*</h2>
      <input
        type="text"
        className="long-answer-input"
        placeholder="Enter password"
        id="answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      ></input>
      {answerErr && (
        <h3 id="answer-answer-error" className="error">
          Error: Invalid Text
        </h3>
      )}
      <div id="answer-question-submit" className="submit">
        <button
          id="submit-answer"
          onClick={() => {
            postAnswer(
              model,
              setModel,
              setter,
              username,
              answer,
              setError,
              resetError,
              qid,
              uid
            );
          }}
        >
          Post Answer
        </button>
        <p>* Indicates Required Field</p>
      </div>
    </div>
  );
}
