// Answer Document Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  text: { type: String, required: true },
  ans_by: { type: String, maxLength: 400, required: true },
  user_id: { type: String },
  question_id: { type: String },
  ans_date_time: { type: Date, default: Date.now() },
  comments: { type: [], default: [] },
  upvotes: { type: Number, default: 0 },
});
AnswerSchema.virtual("url").get(function () {
  var fullurl = "posts/answer/" + this._id;
  return fullurl;
});

//Export model
module.exports = mongoose.model("Answer", AnswerSchema);
