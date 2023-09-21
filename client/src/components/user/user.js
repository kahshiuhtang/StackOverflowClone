import React, { useState, useEffect } from "react";
import { getTime } from "../helper";
import axios from "axios";
import UserRow from "./userRow";
import QuestionRow from "./questionRow";
export default function UserPage({ uid, setUId, setter, setId }) {
  const [date, setDate] = useState(Date.now());
  const [reputation, setReputation] = useState(0);
  const [username, setUsername] = useState("");
  const [admin, setAdmin] = useState(false);
  const [adminUsers, setAdminUsers] = useState([]);
  const [oldUser, setOU] = useState("");
  const [edit, setEdit] = useState(false);
  const [qid, setQID] = useState("");
  const [questions, setQuestions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  async function finder() {
    if (refresh === true) {
      setRefresh(false);
    }
    await axios
      .get("http://localhost:8000/getuseruid/" + uid)
      .then(async (res) => {
        let user = res.data[0];
        if (user.isAdmin) {
          await axios.get("http://localhost:8000/users").then(async (res) => {
            let r = res.data.map((elem) => {
              return (
                <UserRow setUId={setUId} uid={elem.uid} user={elem}></UserRow>
              );
            });
            await axios.get("http://localhost:8000/questions").then((res) => {
              let d = res.data;
              let lis = [];
              for (let i = 0; i < d.length; i++) {
                if (d[i].user_id === uid) {
                  lis.push(d[i]);
                }
              }
              let quests = lis.map((elem) => {
                <QuestionRow
                  data={elem}
                  setEdit={setEdit}
                  setQID={setQID}
                  setId={setId}
                  setter={setter}
                ></QuestionRow>;
              });
              setQuestions(quests);
              setAdminUsers(r);
              setDate(user.join_date);
              setReputation(user.reputation);
              setUsername(user.username);
              setAdmin(user.isAdmin);
              if (oldUser !== username || oldUser === "") {
                setOU(username);
              }
            });
          });
        } else {
          await axios.get("http://localhost:8000/questions").then((res) => {
            let d = res.data;
            let lis = [];
            for (let i = 0; i < d.length; i++) {
              if (d[i].user_id === uid) {
                lis.push(d[i]);
              }
            }
            console.log(lis);
            let quests = lis.map((elem) => {
              return (
                <QuestionRow
                  data={elem}
                  setEdit={setEdit}
                  setQID={setQID}
                  setId={setId}
                  setter={setter}
                ></QuestionRow>
              );
            });
            setQuestions(quests);
            setDate(user.join_date);
            setReputation(user.reputation);
            setUsername(user.username);
            setAdmin(user.isAdmin);
            if (oldUser !== username || oldUser === "") {
              setOU(username);
            }
          });
        }
      });
  }
  useEffect(() => {
    finder();
  }, [oldUser, refresh]);
  return (
    <div id="user-page" style={{ width: "85%" }}>
      <div
        id="user-page-header"
        style={{
          padding: "2rem 2rem",
          borderBottom: "dotted 3px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "3rem",
          }}
        >
          <h1 id="user-page-header">{username}</h1>
        </div>
        <div
          id="user-page-header-information"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h3 id="user-page-header-information-reputation">
            <b>Reputation:</b> {reputation}
          </h3>
          <h3 id="user-page-header-information-account-age">
            <b>Account created</b> {getTime(new Date(), new Date(date))}
          </h3>
        </div>
      </div>
      <div id="user-page">
        <div id="user-page-questions"></div>
        <div style={{ textAlign: "center", borderBottom: " solid " }}>
          {admin && <h1>USERS</h1>}
        </div>
        <div>{questions}</div>
        {admin && <div id="user-page-users">{adminUsers}</div>}
      </div>
    </div>
  );
}
