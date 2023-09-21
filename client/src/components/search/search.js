import React, { useState, useEffect } from "react";
import "../../stylesheets/App.css";
import { sortDate, sortActivity, sortAnswers } from "../helper/sort";
import { search } from "./submitSearch";
import Row from "./row.js";
export default function Search({
  model,
  setModel,
  setter,
  searchResults,
  setQId,
}) {
  const [listElems, setListElems] = useState([]);
  const [sortMode, setSortMode] = useState(0);
  const [row1, setRow1] = useState([]);
  const [len, setLen] = useState(0);
  const [sr, setSR] = useState("");
  let err = false;
  useEffect(() => {
    async function call() {
      await search(model, setModel, searchResults, setter).then((ret) => {
        let sorted =
          sortMode === 0
            ? sortDate(ret)
            : sortMode === 1
            ? sortActivity(ret)
            : sortAnswers(ret);
        setListElems(sorted);
        let temp = listElems.map((elem) => (
          <Row
            key={elem._id + "Se"}
            props={elem}
            setter={setter}
            setQId={setQId}
          ></Row>
        ));
        setRow1(temp);
        if (listElems.length === 0) {
          err = true;
          setSR(searchResults);
        }
        setLen(listElems.length);
        if (sr.localeCompare(searchResults) !== 0) {
          setSR(searchResults);
        }
      });
    }
    call();
  }, [sr, searchResults, len]);
  return (
    <div id="main-questions">
      <div id="questions-header">
        <div id="questions-header-top">
          <h2 id="questions-header-top-title">Search Results</h2>
          <button
            id="questions-header-top-ask"
            onClick={() => {
              setter("create");
            }}
          >
            Ask Question
          </button>
        </div>
        <div id="questions-header-bottom">
          <h3 id="questions-header-number-questions">Questions: {len}</h3>
          <div id="questions-header-bottom-buttons">
            <button
              id="questions-header-bottom-buttons-newest"
              onClick={() => {
                setSortMode(0);
              }}
            >
              Newest
            </button>
            <button
              id="questions-header-bottom-buttons-active"
              onClick={() => {
                setSortMode(1);
              }}
            >
              Active
            </button>
            <button
              id="questions-header-bottom-buttons-unanswered"
              onClick={() => {
                setSortMode(2);
              }}
            >
              Unanswered
            </button>
          </div>
        </div>
      </div>
      <div id="actual-questions">
        {!err && len !== 0 && row1}
        {(err || len === 0) && (
          <div style={{ margin: "2rem 3rem", color: "red" }}>
            <h2>No Elements Found</h2>
          </div>
        )}
      </div>
    </div>
  );
}
