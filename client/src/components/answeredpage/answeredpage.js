import React, { useEffect, useState } from "react";
import { getTime } from "../helper";
import Answer from "./answer";
import "../../stylesheets/App.css";
import axios from "axios";
import Comments from "../comments/comments";
export default function AnsweredQuestion({
  model,
  setModel,
  setter,
  qid,
  uid,
  username,
}) {
  var question = "";
  var ans = "";
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [answerTitle, setAnswerTitle] = useState("");
  const [answerViews, setAnswerViews] = useState(0);
  const [ans1, setAns1] = useState(0);
  const [askedBy, setAskedBy] = useState("");
  const [time, setTime] = useState("");
  const [loadAns, setLoadAns] = useState();
  const [id, setId] = useState(qid);
  const [uv, setUpvotes] = useState(0);
  const [page, setPage] = useState(0);
  const [voteErr, setVoteErr] = useState(false);
  async function upvote() {
    await axios
      .post("http://localhost:8000/votequestion", {
        id: id,
        uid: uid,
        upvotes: uv + 1,
        positive: true,
      })
      .then((res) => {
        if (!res.error) {
          setUpvotes(uv + 1);
        } else {
          setVoteErr(true);
        }
      });
  }
  async function downvote() {
    await axios
      .post("http://localhost:8000/votequestion", {
        id: id,
        uid: uid,
        upvotes: uv - 1,
        positive: false,
      })
      .then((res) => {
        if (!res.error) {
          setUpvotes(uv - 1);
          setVoteErr(false);
        } else {
          setVoteErr(true);
        }
      });
  }
  useEffect(() => {
    axios.get("http://localhost:8000/questions").then((res) => {
      var questions = res.data;
      for (let i = 0; i < questions.length; i++) {
        if (questions[i]._id === qid) {
          question = questions[i];
          break;
        }
      }
      axios.post("http://localhost:8000/addview/" + question._id);
      setTotalAnswers(question.answers.length);
      setAnswerTitle(question.title);
      setAnswerViews(question.views + 1);
      setAskedBy(question.asked_by);
      setAns1(question.text);
      setTime(getTime(new Date(), new Date(question.ask_date_time)));
      setUpvotes(question.upvotes);
      setVoteErr(false);
      console.log(question);
      var la = question.answers.map((elem) => {
        console.log(elem);
        return (
          <Answer
            key={elem._id + "ANSWER"}
            answer={elem}
            qid={qid}
            aid={elem._id}
            uid={uid}
            username={username}
            uvs={elem.upvotes}
          ></Answer>
        );
      });
      setLoadAns(la);
      let word = question.text;
      var regex = /\[.*\]\(.*\)/g;
      var indices = [];
      var ind = word.search(regex);
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
      if (indices.length === 0) {
        setAns1(question.text);
        ans = question.text;
      } else {
        let bot = 0;
        ans = [];
        for (let i = 0; i < indices.length; i++) {
          ans.push(
            <p style={{ display: "inline-block" }}>
              {question.text.substring(bot, indices[i][0])}
            </p>
          );
          let text = question.text.substring(indices[i][0] + 1, indices[i][1]);
          let link = question.text.substring(indices[i][1] + 2, indices[i][2]);
          ans.push(
            <a
              href={link}
              style={{ whiteSpace: "nowrap" }}
              target="_blank"
              rel="noreferrer"
            >
              &nbsp; {text}
            </a>
          );
          bot = indices[i][2] + 1;
        }
        ans.push(
          <p style={{ display: "inline-block" }}>
            {question.text.substring(indices[indices.length - 1][2] + 1)}
          </p>
        );
        setAns1(ans);
      }
    });
  }, []);
  return (
    <div id="answered-page">
      <div id="answer-page-header-top">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          <h3 style={{ display: "inline-block", marginLeft: "1rem" }}>
            {totalAnswers} answer(s)
          </h3>
          <h3
            style={{
              width: "45%",
              alignContent: "center",
              color: "black",
              fontSize: "1.25rem",
              marginRight: "1rem",
            }}
          >
            {answerTitle}
          </h3>
          <button
            style={{
              display: "inline-block",
              width: "15%",
              color: "white",
              fontSize: "1.25rem",
              marginRight: "1rem",
            }}
            onClick={() => {
              if (username != "") {
                setter("create");
              } else {
              }
            }}
          >
            Create Question
          </button>
        </div>
      </div>
      <div
        id="answer-page-header-bottom"
        style={{
          borderBottom: "3px dotted black",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ display: "inline-block", marginLeft: "1rem" }}>
            {answerViews} view(s)
          </h3>
          <div style={{ display: "inline-block", maxWidth: "55%" }}>
            <h3 style={{ display: "inline-block" }}>{ans1}</h3>
          </div>
          <div
            style={{
              display: "inline-block",
              maxWidth: "13%",
              marginRight: "1rem",
            }}
          >
            {askedBy} asked {time}
          </div>
        </div>
        <div style={{ display: "inline-block" }}>
          <div style={{ display: "inline-block", marginLeft: "1rem" }}>
            <b>Upvotes</b> {uv}
          </div>
          {voteErr && <div>Error voting</div>}
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
            {voteErr && <div>Error, not allowed to vote</div>}
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <Comments qid={qid} aid={""} uid={uid} username={username}></Comments>
        </div>
      </div>
      <div id="answer-page-responses">{loadAns}</div>
      {username != "" && (
        <button
          style={{
            margin: "2rem 1rem",
            width: "10%",
            color: "white",
            fontSize: "1.25rem",
            left: "10px",
            top: "15px",
            position: "relative",
          }}
          onClick={() => {
            setter("answer");
          }}
        >
          Answer Question
        </button>
      )}
    </div>
  );
}
