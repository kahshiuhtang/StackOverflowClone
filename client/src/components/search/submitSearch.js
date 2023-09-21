import axios from "axios";

export async function search(model, setModel, searchFields, setter) {
  let tags = [];
  let currTag = "";
  let keepAdd = false;
  for (let i = 0; i < searchFields.length; i++) {
    if (keepAdd && searchFields[i] !== "]") {
      currTag += searchFields[i];
    }
    if (searchFields[i] === "[") {
      keepAdd = true;
    } else if (searchFields[i] === "]") {
      tags.push(currTag);
      currTag = "";
      keepAdd = false;
    }
  }
  for (let i = 0; i < tags.length; i++) {
    searchFields = searchFields.replace("[" + tags[i] + "]", "");
  }
  let keywords = searchFields.replace(/\s+/g, " ").trim().split(" ");
  if (keywords.length === 1 && keywords[0] === "") {
    keywords = [];
  }
  let tagIds = [];
  let tagRes = await axios.get("http://localhost:8000/tags");
  tagRes = tagRes.data;
  let questRes = await axios.get("http://localhost:8000/questions");
  questRes = questRes.data;
  for (let i = 0; i < tags.length; i++) {
    for (let j = 0; j < tagRes.length; j++) {
      if (tags[i] === tagRes[j].name) {
        tagIds.push(tagRes[j]._id);
      }
    }
  }
  let questions = [];
  for (let i = 0; i < questRes.length; i++) {
    let added = false;
    for (let j = 0; j < questRes[i].tags.length; j++) {
      for (let k = 0; k < tagIds.length; k++) {
        if (!added && questRes[i].tags[j]._id.localeCompare(tagIds[k]) === 0) {
          questions.push(questRes[i]);
          added = true;
        }
      }
    }
    if (!added) {
      for (let l = 0; l < keywords.length; l++) {
        if (
          !added &&
          questRes[i].title.toLowerCase().includes(keywords[l].toLowerCase())
        ) {
          questions.push(questRes[i]);
          added = true;
        }
      }
    }
  }
  console.log(questions);
  return questions;
}
