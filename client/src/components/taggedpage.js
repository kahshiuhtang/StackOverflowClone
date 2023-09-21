import React, { useState, useEffect } from "react";
import "../stylesheets/App.css";
import TaggedQuestion from "./tags/taggedQuestions";
import axios from "axios";
export default function Tagged({ model, setModel, id_, setId, setter }) {
  const [quest, setQuest] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/questions").then((res) => {
      var questions = [];
      for (let i = 0; i < res.data.length; i++) {
        for (let j = 0; j < res.data[i].tags.length; j++) {
          if (res.data[i].tags[j]._id === id_) {
            questions.push(res.data[i]);
          }
        }
      }
      setQuest(questions);
    });
  }, []);
  return (
    <div id="tagged-page" className="main">
      <div id="tagged-page-header">
        <div id="tagged-page-header-top">
          <h3 id="tagged-page-top-title">ALL QUESTIONS:</h3>
          <button
            id="tagged-page-top-ask"
            onClick={() => {
              setter("create");
            }}
          >
            Ask Question
          </button>
        </div>
        <div id="tagged-page-bottom">
          <h3 id="tagged-page-number-questions">Questions: {quest.length}</h3>
          <div id="tagged-page-bottom-buttons">
            <button id="tagged-page-bottom-buttons-newest">Newest</button>
            <button id="tagged-page-bottom-buttons-active">Active</button>
            <button id="tagged-page-bottom-buttons-unanswered">
              Unanswered
            </button>
          </div>
        </div>
      </div>
      <div id="tagged-page-body">
        {quest.map((elem) => {
          return (
            <TaggedQuestion
              key={elem._id + "TAGGED"}
              question={elem}
              model={model}
              setModel={setModel}
            ></TaggedQuestion>
          );
        })}
      </div>
    </div>
  );
}
