import React, { useState } from "react";
import "../../stylesheets/App.css";
export default function MainMenu({ model, setModel, setter }) {
  const [qClicked, setQClicked] = useState(false);
  const [tClicked, setTClicked] = useState(false);
  const qClick = function () {
    setQClicked(true);
    setTClicked(false);
    setter("main");
  };
  const tClick = function () {
    setQClicked(false);
    setTClicked(true);
    setter("tags");
  };
  return (
    <div id="main-menu">
      {qClicked && (
        <h5
          id="questions-link"
          style={{ backgroundColor: "lightgray" }}
          onClick={qClick}
        >
          Questions
        </h5>
      )}
      {!qClicked && (
        <h5 id="questions-link" onClick={qClick}>
          Questions
        </h5>
      )}
      {tClicked && (
        <h5
          id="tags-link"
          style={{ backgroundColor: "lightgray" }}
          onClick={tClick}
        >
          Tags
        </h5>
      )}
      {!tClicked && (
        <h5 id="tags-link" onClick={tClick}>
          Tags
        </h5>
      )}
    </div>
  );
}
