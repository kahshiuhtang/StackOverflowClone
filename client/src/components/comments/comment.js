import React, { useState, useEffect } from "react";
import { getTime } from "../helper";
import "../../stylesheets/App.css";
import axios from "axios";
export default function Comment({ text, user, time, upvotes, iD, uid }) {
  const [id, setId] = useState(iD);
  const [uv, setUV] = useState(upvotes);
  const [page, setPage] = useState(0);
  const [US, setUser] = useState(user);
  const [voteErr, setVoteErr] = useState(false);
  async function upvote() {
    await axios
      .post("http://localhost:8000/upvotecomment", {
        id: id,
        uid: uid,
        upvotes: uv + 1,
      })
      .then((res) => {
        if (!res.error) {
          setUV(uv + 1);
        } else {
          setVoteErr(true);
        }
      });
  }
  return (
    <div
      className="comment"
      style={{
        borderBottom: "2px solid black",
        marginTop: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space" }}>
        <div style={{ display: "inline-block", marginLeft: "1rem" }}>
          <button
            style={{
              width: "4.5rem",
              height: "1rem",
              color: "white",
              fontSize: "0.25rem",
              marginLeft: "0.25rem",
            }}
            onClick={() => {
              upvote();
            }}
          >
            Upvote
          </button>
          {voteErr && <div>Error voting</div>}
          <div>{uv} Upvotes</div>
        </div>
      </div>
      <h3 className="comment-content-text" style={{ display: "inline-block" }}>
        {text}
      </h3>
      <div className="comment-content-time" style={{ display: "inline-block" }}>
        <div>
          {user} commented {getTime(new Date(), new Date(time))}
        </div>
      </div>
    </div>
  );
}
