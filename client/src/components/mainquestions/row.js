import React from "react";
import { getTime } from "../helper";
export default function Row({ props, model, setModel, setQId, setter, setId }) {
  var data = props[1];
  var tags = data.tags;
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
        setQId(data._id);
        setter("answered");
      }}
    >
      <div style={{ display: "inline-block" }}>
        <div style={{ display: "block" }}>
          <div>{data.answers.length + " Answers"}</div>
          <div>{data.views + " Views"}</div>
        </div>
      </div>
      <div
        style={{
          display: "inline-block",
          margin: "1rem 2rem",
          maxWidth: "50%",
        }}
      >
        <p style={{ color: "blue" }}>{props[1]["title"]}</p>
        {tags.map((elem) => {
          return (
            <div
              key={elem._id + "R"}
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
                setId(elem.tid);
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
          {data.asked_by +
            " asked " +
            getTime(new Date(), new Date(data.ask_date_time))}
        </div>
      </div>
    </div>
  );
}
