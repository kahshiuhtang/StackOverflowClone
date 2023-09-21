import React from "react";
import { useState } from "react";
import axios from "axios";
export default function UserRow({ setUId, uid, user, setRefresh }) {
  const [phase, setPhase] = useState(0);
  async function deleteUser() {
    if (phase === 0) {
      setPhase(1);
    } else if (phase == 2) {
      await axios.post("http://localhost:8000/removeuser/" + uid).then(() => {
        setRefresh(true);
      });
    }
  }
  return (
    <div
      style={{
        borderBottom: "3px dotted black",
        marginTop: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        padding: "2rem 2rem",
      }}
      onClick={() => {
        setUId(uid);
      }}
    >
      <div style={{ display: "inline-block" }}>
        <div style={{ display: "block" }}>
          <div>
            <b>{user.answers.length}</b> questions answered
          </div>
          <div style={{ marginTop: "1rem" }}>
            <b>{user.questions.length}</b> questions asked
          </div>
        </div>
      </div>
      <div
        style={{
          display: "inline-block",
          margin: "1rem 2rem",
          maxWidth: "50%",
        }}
      >
        <h3>{user.username}</h3>
      </div>
      <div style={{ display: "inline-block" }}>
        <div>Reputation: {user.reputation}</div>
        <button
          style={{ color: "white", height: "1.5rem", marginTop: "0.5rem" }}
          onClick={() => deleteUser()}
        >
          Delete User
        </button>
        {phase === 1 && (
          <div>
            <button
              style={{ color: "white", height: "1rem", marginTop: "0.5rem" }}
              onClick={() => {
                setPhase(2);
                deleteUser();
              }}
            >
              Yes
            </button>
            <button
              style={{ color: "white", height: "1rem", marginTop: "0.5rem" }}
              onClick={() => {
                setPhase(0);
                deleteUser();
              }}
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
