import React, { useState } from "react";
import "../../stylesheets/App.css";
import { createAccount } from "./submitCreateAccount";
import NavBar from "./navbar";
export default function CreateAccount({ setter, setUId, setUsername }) {
  const [username, setUN] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [pErr, setPErr] = useState(false);
  const [eErr, setEErr] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      <NavBar></NavBar>
      <div id="create-account" className="main">
        <h2>Username</h2>
        <input
          id="create-account-title"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUN(e.target.value)}
        />
        <h2>Email</h2>
        <input
          type="text"
          id="create-email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        {eErr && <div>Error with chosen email</div>}
        <h2>Password</h2>
        <input
          type="text"
          placeholder="Enter your password"
          id="create-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {pErr && <div>Error with chosen password</div>}
        <div id="create-account-submit" className="submit" onClick={() => {}}>
          <button
            style={{ width: "25%" }}
            id="create-account"
            onClick={async () => {
              let res = await createAccount(
                email,
                username,
                password,
                setter,
                setUId,
                setUsername,
                setEErr,
                setPErr
              );
            }}
          >
            Create Account
          </button>
          <p>*Indicates Required Field</p>
        </div>
      </div>
    </div>
  );
}
