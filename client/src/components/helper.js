export function findTag(tags, id) {
  for (let i = 0; i < tags.length; i++) {
    if (id === tags[i].tid) {
      return tags[i].name;
    }
  }
}
function months(num) {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[num];
}
export function getTime(date1, date2) {
  //date1 is after date2
  let year = date1.getFullYear() === date2.getFullYear();
  let month = date1.getMonth() === date2.getMonth();
  let date = date1.getDate() === date2.getDate();
  let hour = date1.getHours() === date2.getHours();
  let minute = date1.getMinutes() === date2.getMinutes();
  let zero = date2.getMinutes() < 10 ? "0" : "";
  if (year && month && date && hour && minute) {
    return date1.getSeconds() - date2.getSeconds() + " seconds ago";
  } else if (year && month && date && hour) {
    if (date1.getSeconds() < date2.getSeconds()) {
      return date1.getMinutes() - date2.getMinutes() - 1 + " minutes ago";
    }
    return date1.getMinutes() - date2.getMinutes() + " minutes ago";
  } else if (year && month && date) {
    if (date1.getMinutes() < date2.getMinutes()) {
      return date1.getHours() - date2.getHours() - 1 + " hours ago";
    }
    return date1.getHours() - date2.getHours() + " hours ago";
  } else if (year && month) {
    if (
      Math.abs(date1.getDate() - date2.getDate()) === 1 &&
      date1.getHours() < date2.getHours()
    ) {
      let num = date2.getMinutes() - date1.getMinutes() < 0 ? 0 : 1;
      return 24 + date1.getHours() - date2.getHours() - num + " hours ago";
    }
    return (
      months(date2.getMonth()) +
      " " +
      date2.getDate() +
      " at " +
      date2.getHours() +
      ":" +
      zero +
      date2.getMinutes()
    );
  } else if (year) {
    return (
      months(date2.getMonth()) +
      " " +
      date2.getDate() +
      " at " +
      date2.getHours() +
      ":" +
      zero +
      date2.getMinutes()
    );
  } else {
    return (
      months(date2.getMonth()) +
      " " +
      date2.getDate() +
      ", " +
      date2.getFullYear() +
      " at " +
      date2.getHours() +
      ":" +
      zero +
      date2.getMinutes()
    );
  }
}
export async function minDate(question, model) {
  let answerDate = question.answers;
  var ans = new Date("1970-09-30");
  for (let i = 0; i < answerDate.length; i++) {
    if (ans - answerDate[i] < 0) {
      ans = answerDate[i];
    }
  }
  return ans;
}
