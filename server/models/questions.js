// Question Document Schema
// Answer Document Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  text: { type: String, required: true },
  tags: { type: [], required: true },
  answers: { type: [], required: true },
  asked_by: { type: String, maxLength: 100, default: "Anonymous" },
  ask_date_time: { type: Date, default: Date.now() },
  views: { type: Number, default: 0 },
  comments: { type: [], default: [] },
  user_id: { type: String },
  upvotes: { type: Number, default: 0 },
});
QuestionSchema.virtual("url").get(function () {
  var fullurl = "posts/question/" + this._id;
  return fullurl;
});

//Export model
module.exports = mongoose.model("Question", QuestionSchema);
