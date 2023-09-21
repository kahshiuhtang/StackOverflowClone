import React, { useState } from "react";
import "../../stylesheets/App.css";
import { submitQuestion } from "./submitQuestion";
export default function CreateQuestion({
  model,
  setModel,
  setter,
  username,
  uid,
}) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [detailsErr, setDetailsErr] = useState(false);
  const [tagsErr, setTagsErr] = useState(false);
  function setError(targ) {
    if (targ === "title") {
      setTitleErr(true);
    } else if (targ === "details") {
      setDetailsErr(true);
    } else if (targ === "tags") {
      setTagsErr(true);
    }
  }
  function resetError() {
    setTitleErr(false);
    setDetailsErr(false);
    setTagsErr(false);
  }

  return (
    <div id="create-question" className="main">
      <h2>Question Title*</h2>
      <p>Less than 100 characters</p>
      <input
        id="create-question-title"
        type="text"
        placeholder="Enter a summary of your question"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {titleErr && (
        <p id="title-error" className="error">
          Error: Invalid Length, Try Again
        </p>
      )}
      <h2>Question Text*</h2>
      <p>Add Details</p>
      <textarea
        type="text"
        id="create-question-summary"
        className="long-answer-input"
        placeholder="Elaborate On Your Question"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      ></textarea>
      {detailsErr && (
        <p id="details-error" className="error">
          Error: Invalid Text, Try Again
        </p>
      )}
      <h2>Tags*</h2>
      <p>Add Keywords Seperated By Whitespace</p>
      <input
        type="text"
        placeholder="Enter relavant tags [At least 1]"
        id="create-question-tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      {tagsErr && (
        <p id="tags-error" className="error">
          Error: Invalid Length, Try Again
        </p>
      )}

      <div id="create-question-submit" className="submit">
        <button
          id="post-question"
          onClick={() => {
            submitQuestion(
              model,
              setModel,
              setter,
              title,
              details,
              username,
              tags,
              setError,
              resetError,
              uid
            );
          }}
        >
          Post Question
        </button>
        <p>*Indicates Required Field</p>
      </div>
    </div>
  );
}
