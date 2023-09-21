import React from "react";
import { getTime } from "../helper";
export default function Row({ props, setQId, setter, setId }) {
  return (
    <div
      style={{
        borderBottom: "3px dotted black",
        marginTop: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        padding: "2rem 2rem",
      }}
      onClick={() => {
        setQId(props._id);
        setter("answered");
      }}
    >
      <div style={{ display: "inline-block" }}>
        <div style={{ display: "block" }}>
          <div>{props.answers.length + " Answers"}</div>
          <div>{props.views + " Views"}</div>
        </div>
      </div>
      <div
        style={{
          display: "inline-block",
          margin: "1rem 2rem",
          maxWidth: "50%",
        }}
      >
        <p style={{ color: "blue" }}>{props.title}</p>
        {props.tags.map((elem) => {
          return (
            <div
              key={elem._id + "ST"}
              style={{
                display: "inline-block",
                padding: "0.5rem",
                border: "solid block 1px",
                boderRadius: "3px",
                marginRight: "0.5rem",
                backgroundColor: "red",
                color: "white",
              }}
              onClick={() => {
                setId(elem._id);
                setter("tagged");
              }}
            >
              {elem.name}
            </div>
          );
        })}
      </div>
      <div style={{ display: "inline-block" }}>
        <div style={{ display: "inline-block" }}>
          {props.asked_by +
            " asked " +
            getTime(new Date(), new Date(props.ask_date_time))}
        </div>
      </div>
    </div>
  );
}
