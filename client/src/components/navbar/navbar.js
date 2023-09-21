import React from "react";
import "../../stylesheets/App.css";
import { useState } from "react";

export default function Navbar({
  setSearchResults,
  setter,
  setUId,
  setUsername,
}) {
  const [input, setInput] = useState("");
  const handleSubmit = function () {
    setSearchResults(input);
    setter("search");
  };
  function logout() {
    sessionStorage.setItem("id", null);
    sessionStorage.setItem("email", null);
    sessionStorage.setItem("username", null);
    setUId("");
    setUsername("");
    setter("lock");
  }
  return (
    <>
      <div id="header" className="header">
        <div>
          <button
            style={{ marginLeft: "1rem", color: "white" }}
            onClick={() => {
              setter("user");
            }}
          >
            View Profile
          </button>
          <button
            style={{ marginLeft: "1rem", color: "white" }}
            onClick={() => {
              logout();
            }}
          >
            Log Out
          </button>
        </div>
        <div id="header-logo">
          fake stack <b>overflow</b>
        </div>
        <input
          id="header-search"
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </div>
    </>
  );
}
