// Answer Document Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  text: { type: String },
  comment_by: { type: String, maxLength: 400 },
  comment_date_time: { type: Date, default: Date.now() },
  user_id: { type: String },
  answer_id: { type: String },
  question_id: { type: String },
  upvotes: { type: Number, default: 0 },
});
module.exports = mongoose.model("Comment", CommentSchema);
