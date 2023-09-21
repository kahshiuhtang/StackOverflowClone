import React, { useState } from "react";
import { getTime } from "../helper";
import Comments from "../comments/comments";
import axios from "axios";
export default function Answer({ answer, qid, aid, uid, username, uvs }) {
  const [id, setID] = useState(aid);
  const [uv, setUpvotes] = useState(uvs);
  const [voteErr, setVoteErr] = useState(false);
  let word = answer.text;
  var regex = /\[.*\]\(.*\)/g;
  var indices = [];
  var ind = -1;
  if (word !== undefined) {
    ind = word.search(regex);
  }
  while (ind !== -1) {
    let it = ind;
    while (word.charAt(it) !== "]") {
      it++;
    }
    let split = it;
    it++;
    while (word.charAt(it) !== ")") {
      it++;
    }
    let end = it;
    let args = [];
    args.push(ind);
    args.push(split);
    args.push(end);
    indices.push(args);
    ind = word.substring(it).search(regex);
  }
  var ans = "";
  if (indices.length === 0) {
    ans = answer.text;
  } else {
    let bot = 0;
    ans = [];
    for (let i = 0; i < indices.length; i++) {
      let text = answer.text.substring(indices[i][0] + 1, indices[i][1]);
      let link = answer.text.substring(indices[i][1] + 2, indices[i][2]);
      ans.push(
        <p style={{ display: "inline-block" }}>
          {answer.text.substring(bot, indices[i][0])}
        </p>
      );
      ans.push(
        <a
          href={link}
          style={{ whiteSpace: "nowrap" }}
          target="_blank"
          rel="noreferrer"
        >
          {text}
        </a>
      );
      bot = indices[i][2] + 1;
    }
    ans.push(
      <p style={{ display: "inline-block" }}>
        {answer.text.substring(indices[indices.length - 1][2] + 1)}
      </p>
    );
  }
  async function upvote() {
    await axios
      .post("http://localhost:8000/voteanswer", {
        id: id,
        uid: uid,
        upvotes: uv + 1,
        positive: true,
      })
      .then((res) => {
        if (!res.error) {
          setUpvotes(uv + 1);
          setVoteErr(false);
        } else {
          setVoteErr(true);
        }
      });
  }
  async function downvote() {
    await axios
      .post("http://localhost:8000/voteanswer", {
        id: id,
        uid: uid,
        upvotes: uv - 1,
        positive: false,
      })
      .then((res) => {
        if (!res.error) {
          setUpvotes(uv - 1);
        } else {
          setVoteErr(true);
        }
      });
  }
  return (
    <div
      style={{
        borderBottom: "dotted 3px black",
      }}
    >
      <div
        style={{
          maxWidth: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "65%" }}>
          <h4>{ans}</h4>
        </div>
        <h4 style={{ maxWidth: "15%" }}>
          {answer.ans_by} answered
          {getTime(new Date(), new Date(answer.ans_date_time))}
        </h4>
        <div></div>
      </div>
      <div>
        <div style={{ display: "inline-block" }}>
          <div style={{ display: "inline-block", marginLeft: "2rem" }}>
            <b>Upvotes</b> {uv}
          </div>
          <div style={{ display: "inline-block", marginLeft: "1rem" }}>
            <button
              style={{
                width: "4.5rem",
                height: "1rem",
                color: "white",
                fontSize: "0.75rem",
                marginLeft: "0.25rem",
              }}
              onClick={() => {
                upvote();
              }}
            >
              Upvote
            </button>
            <button
              style={{
                width: "4.5rem",
                height: "1.0rem",
                color: "white",
                fontSize: "0.75rem",
                marginLeft: "0.5rem",
              }}
              onClick={() => {
                downvote();
              }}
            >
              Downvote
            </button>
          </div>
          {voteErr && <div>Error voting</div>}
        </div>
        <Comments
          qid={""}
          aid={answer._id}
          uid={uid}
          username={username}
        ></Comments>
      </div>
    </div>
  );
}
