import React, { useState, useEffect } from "react";
import "../../stylesheets/App.css";
import Row from "./row";
import RowOne from "./row1";
import RowTwo from "./row2";
import axios from "axios";
export default function Tags({ props, setModel, setter, setId }) {
  const [tags, setTags] = useState([]);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/tags").then((res) => {
      setTags(res.data);
    });
    axios.get("http://localhost:8000/questions").then((res) => {
      setQuestions(res.data);
    });
  }, [props]);
  const norms = [];
  const uni = [];
  const diff = tags.length % 3;
  for (let i = 0; i < tags.length - diff; ) {
    norms.push(
      <Row
        key={tags[i]._id + tags[i + 1]._id + tags[i + 2]._id + "Row 1"}
        tag1={tags[i]}
        tag2={tags[i + 1]}
        tag3={tags[i + 2]}
        model={questions}
        setter={setter}
        setId={setId}
      ></Row>
    );
    i += 3;
  }
  if (diff === 1) {
    uni.push(
      <RowOne
        key={tags[tags.length - 1]._id + "Row 2"}
        tag1={tags[tags.length - 1]}
        model={questions}
        setter={setter}
        setId={setId}
      ></RowOne>
    );
  } else if (diff === 2) {
    uni.push(
      <RowTwo
        key={tags[tags.length - 2]._id + tags[tags.length - 1]._id + "Row 3"}
        tag1={tags[tags.length - 2]}
        tag2={tags[tags.length - 1]}
        model={questions}
        setter={setter}
        setId={setId}
      ></RowTwo>
    );
  }
  return (
    <div id="tags-page" className="main">
      <div id="tags-page-header">
        <div
          style={{
            width: "80%",
            margin: "2.5rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1>{tags.length} Tags</h1>
          <h1>All Tags</h1>
          <button
            style={{ width: "15%", color: "white", fontSize: "1.25rem" }}
            onClick={() => setter("create")}
          >
            Create Question
          </button>
        </div>
      </div>
      <div id="tags-page-loaded-tags">
        {norms}
        {uni}
      </div>
    </div>
  );
}
