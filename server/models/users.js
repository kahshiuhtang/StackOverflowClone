var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  reputation: { type: Number, default: 100 },
  join_date: { type: Date, default: Date.now() },
  answers: { type: [], default: [] },
  questions: { type: [], default: [] },
  comments: { type: [], default: [] },
  isAdmin: { type: Boolean, default: false },
});

//Export model
module.exports = mongoose.model("User", UserSchema);
