import React from "react";
export default function Row({ tag1, tag2, tag3, model, setter, setId }) {
  function countQuestions(tag) {
    let count = 0;
    for (let j = 0; j < model.length; j++) {
      for (let i = 0; i < model[j].tags.length; i++) {
        if (model[j].tags[i]._id === tag._id) {
          count++;
        }
      }
    }
    return count;
  }
  const c1 = countQuestions(tag1);
  const c2 = countQuestions(tag2);
  const c3 = countQuestions(tag3);
  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        justifyContent: "space-between",
        margin: "2.5rem",
      }}
    >
      <div
        key={"T1"}
        style={{
          border: "2px dotted black",
          width: "200px",
          height: "150px",
          textAlign: "center",
          alignItems: "center",
          display: "inline-block",
          fontSize: "1.5rem",
          position: "inherit",
        }}
        onClick={() => {
          setId(tag1._id);
          setter("tagged");
        }}
      >
        <span style={{ textDecoration: "underline", color: "blue" }}>
          {tag1.name}
        </span>
        <p>Questions : {c1}</p>
      </div>
      <div
        key={"T2"}
        style={{
          border: "2px dotted black",
          width: "200px",
          height: "150px",
          textAlign: "center",
          alignItems: "center",
          display: "inline-block",
          fontSize: "1.5rem",
          position: "inherit",
        }}
        onClick={() => {
          setId(tag2._id);
          setter("tagged");
        }}
      >
        <span href="" style={{ textDecoration: "underline", color: "blue" }}>
          {tag2.name}
        </span>
        <p>Questions : {c2}</p>
      </div>
      <div
        key={"T3"}
        style={{
          border: "2px dotted black",
          width: "200px",
          height: "150px",
          textAlign: "center",
          alignItems: "center",
          display: "inline-block",
          fontSize: "1.5rem",
          position: "inherit",
        }}
        onClick={() => {
          setId(tag1._id);
          setter("tagged");
        }}
      >
        <span style={{ textDecoration: "underline", color: "blue" }}>
          {tag3.name}
        </span>
        <p>Questions : {c3}</p>
      </div>
    </div>
  );
}
