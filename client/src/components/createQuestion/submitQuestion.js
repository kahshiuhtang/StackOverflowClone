import axios from "axios";
export async function submitQuestion(
  model,
  setModel,
  setter,
  title,
  summary,
  username,
  tags,
  setError,
  resetError,
  uid
) {
  resetError();
  let tagArrays = tags.replace(/^\s+|\s+$/g, "").split(" ");
  if (tagArrays.length === 1 && tagArrays[0] === "") {
    tagArrays = [];
  }
  let err = false;
  if (title.length > 100 || title.length === 0) {
    setError("title");
    err = true;
  }
  if (summary.length === 0) {
    setError("details");
    err = true;
  }
  if (tagArrays.length === 0 || tagArrays.length > 5) {
    setError("tags");
    err = true;
  } else {
    for (let i = 0; i < tagArrays.length; i++) {
      if (tagArrays[i].length > 100) {
        setError("tags");
        err = true;
      }
    }
  }
  var regex = /\[.*\]\(.*\)/g;
  var ind = summary.search(regex);
  while (ind !== -1) {
    let it = ind;
    while (summary.charAt(it) !== "]") {
      it++;
    }
    it++;
    if (
      summary.substring(it + 1, it + 9) !== "https://" &&
      summary.substring(it + 1, it + 8) !== "http://"
    ) {
      setError("answer");
      err = true;
      return;
    }
    ind = summary.substring(it).search(regex);
  }
  if (err) {
    return;
  }
  tagArrays = [...new Set(tagArrays)];
  var tagsArray = [];
  await axios.get("http://localhost:8000/tags").then(async (res) => {
    for (let i = 0; i < tagArrays.length; i++) {
      for (let j = 0; j < res.data.length; j++) {
        if (
          j === res.data.length - 1 &&
          res.data[j].name.localeCompare(tagArrays[i]) !== 0
        ) {
          let newTag = {
            name: tagArrays[i],
            add: true,
          };
          tagsArray.push(newTag);
          break;
        } else if (res.data[j].name.localeCompare(tagArrays[i]) === 0) {
          tagsArray.push({ name: res.data[j].name, add: false });
          break;
        }
      }
    }
    let newQuestion = {
      title: title,
      text: summary,
      tags: tagsArray,
      askedBy: username,
      askDate: new Date(),
      ansIds: [],
      views: 0,
      uid: uid,
      old: false,
      qid: "",
    };
    await axios
      .post("http://localhost:8000/addquestion", newQuestion)
      .then(() => {
        setModel([]);
        setter("main");
      });
    //model = sortDate(model);
  });

  //NEED TO ADD CORRECT tagIDs
}
