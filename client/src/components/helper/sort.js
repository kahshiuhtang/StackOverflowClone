import { minDate } from "../helper";
export function sortDate(model) {
  let ans = model.sort(function (a, b) {
    return new Date(b.ask_date_time) - new Date(a.ask_date_time);
  });
  return ans;
}
export function sortActivity(model) {
  let ans = model.sort(function (a, b) {
    return minDate(b, model) - minDate(a, model);
  });
  return ans;
}
export function sortAnswers(model) {
  let ans = model.sort(function (a, b) {
    return a.answers.length - b.answers.length;
  });
  return ans;
}
