import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../stylesheets/App.css";
import Comment from "./comment";
export default function Comments({ qid, aid, uid, username }) {
  const [page, setPage] = useState(1);
  const [txt, setTxt] = useState("");
  const [elements, setElements] = useState([]);
  const [err, setErr] = useState(false);
  const [refresh, setRefresh] = useState(false);
  console.log(username);
  async function submitComment() {
    let comment = {
      qid: qid,
      aid: aid,
      uid: uid,
      username: username,
      text: txt,
    };
    await axios.post("http://localhost:8000/addcomment", comment);
  }
  async function finder() {
    await axios.get("http://localhost:8000/comments").then((rest) => {
      let comments = rest.data;
      let list = [];
      for (let i = 0; i < comments.length; i++) {
        if (
          (qid != "" && comments[i].question_id === qid) ||
          (aid != "" && comments[i].answer_id === aid)
        ) {
          list.push(comments[i]);
        }
      }
      if (refresh === true) {
        setRefresh(false);
      }
      let res = list.map((elem) => {
        return (
          <Comment
            key={elem._id}
            text={elem.text}
            user={elem.comment_by}
            time={elem.comment_date_time}
            upvotes={elem.upvotes}
            iD={elem._id}
            uid={uid}
          ></Comment>
        );
      });
      setElements(res);
    });
  }
  useEffect(() => {
    finder();
  }, [refresh]);
  return (
    <div
      style={{
        marginLeft: "2rem",
        marginTop: "2rem",
        borderTop: "solid black 0.15rem",
      }}
    >
      {elements}
      <div>
        <button
          style={{
            width: "2.5rem",
            height: "1.0rem",
            color: "white",
            fontSize: "0.75rem",
          }}
          className="comments-prevButton"
          onClick={() => {
            if (page > 1) setPage(() => page - 1);
          }}
        >
          Prev
        </button>
        <button
          className="comments-nextButton"
          style={{
            width: "2.5rem",
            height: "1.0rem",
            color: "white",
            fontSize: "0.75rem",
          }}
          onClick={() => {
            setPage(() => page - 1);
          }}
        >
          Next
        </button>
      </div>
      {username != "" && (
        <div>
          <input
            style={{
              fontSize: "0.75rem",
              height: "1.0rem",
              marginTop: "0.5rem",
              marginRight: "0.5rem",
              borderColor: "black",
            }}
            id="comment-input"
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
          ></input>
          {err && <h3 className="error">Error: Text too long</h3>}
          {
            <button
              id="comments-submitCommentButton"
              type="text"
              placeholder="Enter comment"
              value={txt}
              style={{
                width: "4rem",
                height: "1.0rem",
                color: "white",
                fontSize: "0.75rem",
              }}
              onChange={(e) => setTxt(e.target.value)}
              onClick={async () => {
                setErr(false);
                if (txt.length >= 140) {
                  setErr(true);
                } else {
                  await submitComment(txt, qid, aid, uid, username).then(() =>
                    setRefresh(true)
                  );
                }
              }}
            >
              Comment
            </button>
          }
        </div>
      )}
    </div>
  );
}
