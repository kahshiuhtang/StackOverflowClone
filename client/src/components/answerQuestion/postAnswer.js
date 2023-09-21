import axios from "axios";
export default async function postAnswer(
  model,
  setModel,
  setter,
  username,
  answer,
  setError,
  resetError,
  qid,
  uid
) {
  resetError();
  let err = false;
  if (username.length === 0) {
    setError("username");
    err = true;
  }
  if (answer.length === 0) {
    setError("answer");
    err = true;
  }
  var regex = /\[.*\]\(.*\)/g;
  var ind = answer.search(regex);
  while (ind !== -1) {
    let it = ind;
    while (answer.charAt(it) !== "]") {
      it++;
    }
    it++;
    if (
      answer.substring(it + 1, it + 9) !== "https://" &&
      answer.substring(it + 1, it + 8) !== "http://"
    ) {
      setError("answer");
      err = true;
      return;
    }
    ind = answer.substring(it).search(regex);
  }
  if (err) {
    return;
  }
  let newAnswer = {
    text: answer,
    ans_by: username,
    ans_date: new Date(),
    qid: qid,
    uid: uid,
  };
  await axios.post("http://localhost:8000/addanswer", newAnswer);
  setter("answered");
}
