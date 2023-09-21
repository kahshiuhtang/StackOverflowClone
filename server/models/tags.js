// Tag Document Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TagSchema = new Schema({
  name: { type: String, required: true },
});
TagSchema.virtual("url").get(function () {
  var fullurl = "posts/tag/" + this._id;
  return fullurl;
});

//Export model
module.exports = mongoose.model("Tag", TagSchema);
