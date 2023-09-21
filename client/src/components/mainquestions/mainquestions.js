import React, { useState, useEffect } from "react";
import "../../stylesheets/App.css";
import { sortActivity, sortDate, sortAnswers } from "../helper/sort";
import Row from "./row";
import axios from "axios";
export default function MainQuestions({
  props,
  setModel,
  setter,
  setQId,
  setId,
  username,
}) {
  const [length, setLength] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [listElems, setListElems] = useState(null);
  const [mode, setMode] = useState(0); //0->date, 1->activity, 2->answers
  console.log(questions);
  useEffect(() => {
    axios.get("http://localhost:8000/questions").then((res) => {
      let sorted =
        mode === 0
          ? sortDate(res.data)
          : mode === 1
          ? sortActivity(res.data)
          : sortAnswers(res.data);
      var le = Object.entries(sorted).map((elem) => (
        <Row
          key={elem[1]._id + "MR"}
          props={elem}
          model={props}
          setModel={setModel}
          setter={setter}
          setQId={setQId}
          setId={setId}
        ></Row>
      ));
      setListElems(le);
      setQuestions(res.data);
      setLength(res.data.length);
    });
  }, [mode]);
  return (
    <div id="main-questions">
      <div id="questions-header">
        <div id="questions-header-top">
          <h3 id="questions-header-top-title">ALL QUESTIONS:</h3>
          {username != "" && (
            <button
              id="questions-header-top-ask"
              onClick={() => {
                setter("create");
              }}
            >
              Ask Question
            </button>
          )}
        </div>
        <div id="questions-header-bottom">
          <h3 id="questions-header-number-questions">Questions: {length}</h3>
          <div id="questions-header-bottom-buttons">
            <button
              id="questions-header-bottom-buttons-newest"
              onClick={() => {
                setMode(0);
              }}
            >
              Newest
            </button>
            <button
              id="questions-header-bottom-buttons-active"
              onClick={() => {
                setMode(1);
              }}
            >
              Active
            </button>
            <button
              id="questions-header-bottom-buttons-unanswered"
              onClick={() => {
                setMode(2);
              }}
            >
              Unanswered
            </button>
          </div>
        </div>
      </div>
      <div id="actual-questions">{listElems}</div>
    </div>
  );
}
