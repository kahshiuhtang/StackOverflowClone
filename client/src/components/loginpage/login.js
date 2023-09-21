import React, { useState } from "react";
import "../../stylesheets/App.css";
import { login } from "./submitLogin";
import NavBar from "./navbar";
export default function Login({ setter, setUId, setUsername }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      <NavBar></NavBar>
      <div id="create-account">
        <h2>Email*</h2>
        <input
          type="text"
          id="create-email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <h2>Password*</h2>
        <input
          type="text"
          placeholder="Password"
          id="create-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <div>Error: cant login</div>}
        <div id="create-account-submit" className="submit" onClick={() => {}}>
          <button
            id="login-account"
            onClick={async () => {
              setErr(false);
              await login(email, password, setter, setUId, setUsername, setErr);
            }}
          >
            Login
          </button>
          <p>*Indicates Required Field</p>
        </div>
      </div>
    </div>
  );
}
