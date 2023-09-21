import React, { useState } from "react";
import "../../stylesheets/App.css";
import Navbar from "./navbar";
export default function StartingPage({ setter, setUsername, setUId }) {
  if (
    sessionStorage.getItem("username") !== "" &&
    sessionStorage.getItem("username") !== "null" &&
    sessionStorage.getItem("username") !== null
  ) {
    setUsername(sessionStorage.getItem("username"));
    setUId(sessionStorage.getItem("id"));
    setter("main");
  }
  return (
    <div style={{ width: "100%" }}>
      <Navbar></Navbar>
      <div
        id="starter-buttons-div"
        style={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          marginTop: "5%",
          justifyContent: "space-around",
        }}
      >
        <button
          id="register-button"
          onClick={() => {
            setter("createAcc");
          }}
        >
          Create Account
        </button>
        <button
          id="login-button"
          onClick={() => {
            setter("login");
          }}
        >
          Login
        </button>
        <button
          id="continue-button"
          onClick={() => {
            setter("main");
          }}
        >
          Continue As Guest
        </button>
      </div>
    </div>
  );
}
