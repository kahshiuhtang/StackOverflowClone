import React from "react";
import { getTime } from "../helper";
export default function TaggedQuestion({ question, model, setModel }) {
  return (
    <div
      style={{
        borderBottom: "3px dotted black",
        marginTop: "2rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "inline-block" }}>
        <div style={{ display: "inline-block", padding: "3rem 2rem" }}>
          <div>
            <h3>{question.answers.length + " answers"}</h3>
          </div>
          <div style={{ style: "block" }}>
            <h3>{question.views + " views"}</h3>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "inline-block",
          margin: "1rem 2rem",
          maxWidth: "70%",
        }}
      >
        <p style={{ color: "blue" }}>{question.title}</p>
        <div>
          {question.tags.forEach((elem) => {
            return (
              <div
                key={elem}
                style={{
                  display: "inline-block",
                  padding: "0.5rem",
                  border: "solid black 1px",
                  borderRadius: "3px",
                  marginRight: "0.5rem",
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                {elem.name}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: "inline-block" }}>
        <div style={{ display: "inline-block" }}></div>
        <p>
          {question.asked_by +
            " asked " +
            getTime(new Date(), new Date(question.ask_date_time))}
        </p>
      </div>
    </div>
  );
}
