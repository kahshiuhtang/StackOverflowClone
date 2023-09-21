import React, { useState } from "react";
import Navbar from "./navbar/navbar.js";
import MainMenu from "./mainmenu/mainmenu.js";
import MainQuestions from "./mainquestions/mainquestions.js";
import Search from "./search/search.js";
import AnsweredQuestion from "./answeredpage/answeredpage.js";
import AnswerQuestion from "./answerQuestion/answerquestion.js";
import CreateQuestion from "./createQuestion/createquestion.js";
import Tagged from "./taggedpage.js";
import Tags from "./tags/tagspage.js";
import Model from "../models/model.js";
import StartingPage from "./loginpage/loginpage.js";
import "../stylesheets/App.css";
import Login from "./loginpage/login.js";
import CreateAccount from "./loginpage/createaccount.js";
import UserPage from "./user/user.js";
export default function FakeStackOverflow() {
  const [model, setModel] = useState(new Model());
  const [id, setId] = useState("");
  const [qid, setQId] = useState("");
  const [uid, setUId] = useState("");
  //646140405eea21558f79299b
  const [searchResults, setSearchResults] = useState("");
  const [main, setMain] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [create, setCreate] = useState(false);
  const [tagged, setTagged] = useState(false);
  const [tags, setTags] = useState(false);
  const [search, setSearch] = useState(false);
  const [locked, setLocked] = useState(true);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(false);
  const [createAcc, setCreateAcc] = useState(false);
  const [userName, setUsername] = useState("");
  const setter = function (trig) {
    setMain(false);
    setAnswered(false);
    setAnswer(false);
    setCreate(false);
    setTagged(false);
    setTags(false);
    setSearch(false);
    setLocked(false);
    setLogin(false);
    setCreateAcc(false);
    setUser(false);
    if (trig === "main") {
      setMain(true);
    } else if (trig === "answered") {
      setAnswered(true);
    } else if (trig === "answer") {
      setAnswer(true);
    } else if (trig === "create") {
      setCreate(true);
    } else if (trig === "tagged") {
      setTagged(true);
    } else if (trig === "tags") {
      setTags(true);
    } else if (trig === "search") {
      setSearch(true);
    } else if (trig === "lock") {
      setLocked(true);
    } else if (trig === "login") {
      setLogin(true);
    } else if (trig === "createAcc") {
      setCreateAcc(true);
    } else if (trig === "user") {
      setUser(true);
    }
  };
  return (
    <>
      {!locked && !login && !createAcc && (
        <Navbar
          setSearchResults={setSearchResults}
          setter={setter}
          setUId={setUId}
          setUsername={setUsername}
        ></Navbar>
      )}
      <div className="main" id="main">
        {!locked && !login && !createAcc && (
          <MainMenu
            model={model}
            setModel={setModel}
            setter={setter}
          ></MainMenu>
        )}
        {!locked && !login && !createAcc && <div className="VL"></div>}
        {locked && (
          <StartingPage
            setter={setter}
            setUId={setUId}
            setUsername={setUsername}
          ></StartingPage>
        )}
        {login && (
          <Login
            setter={setter}
            setUId={setUId}
            setUsername={setUsername}
          ></Login>
        )}
        {createAcc && (
          <CreateAccount
            setter={setter}
            setUId={setUId}
            setUsername={setUsername}
          ></CreateAccount>
        )}
        {main && (
          <MainQuestions
            setModel={setModel}
            props={model}
            setter={setter}
            setQId={setQId}
            setId={setId}
            uId={uid}
            username={userName}
          ></MainQuestions>
        )}
        {user && (
          <UserPage
            uid={uid}
            setUId={setUId}
            setter={setter}
            setId={setId}
          ></UserPage>
        )}
        {answered && (
          <AnsweredQuestion
            model={model}
            setModel={setModel}
            setter={setter}
            qid={qid}
            uid={uid}
            username={userName}
          ></AnsweredQuestion>
        )}
        {answer && (
          <AnswerQuestion
            model={model}
            setModel={setModel}
            setter={setter}
            qid={qid}
            username={userName}
            uid={uid}
          ></AnswerQuestion>
        )}
        {create && (
          <CreateQuestion
            model={model}
            setModel={setModel}
            setter={setter}
            username={userName}
            uid={uid}
          ></CreateQuestion>
        )}
        {tagged && (
          <Tagged
            model={model}
            setModel={setModel}
            id_={id}
            setId={setId}
            setter={setter}
            uId={uid}
          ></Tagged>
        )}
        {tags && (
          <Tags
            props={model}
            setModel={setModel}
            setter={setter}
            setId={setId}
          ></Tags>
        )}
        {search && (
          <Search
            model={model}
            setModel={setModel}
            setter={setter}
            searchResults={searchResults}
            setQId={setQId}
            uId={uid}
          ></Search>
        )}
      </div>
    </>
  );
}
