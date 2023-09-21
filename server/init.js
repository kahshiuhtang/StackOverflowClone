//Setup database with initial test data.
// Include an admin user.
// Script should take admin credentials as arguments as described in the requirements doc.
const bcrypt = require("bcrypt");
const saltRounds = 3;
let adminUsername = process.argv[2];
let adminPassword = process.argv[3];
let Tag = require("./models/tags");
let Answer = require("./models/answers");
let Question = require("./models/questions");
let Comment = require("./models/comments");
let User = require("./models/users");

let mongoose = require("mongoose");
let mongoDB = "mongodb://127.0.0.1:27017/fake_so";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

function userCreate(username, email, password, answers, questions, comments) {
  let user = new User({
    username: username,
    email: email,
    password: password,
    reputation: 100,
    join_date: Date.now(),
    answers: answers,
    questions: questions,
    comments: comments,
    isAdmin: false,
  });
  return user.save();
}
function commentCreate(
  text,
  comment_by,
  comment_date_time,
  user_id,
  answer_id,
  question_id,
  upvotes
) {
  let comment = new Comment({
    text: text,
    comment_by: comment_by,
    comment_date_time: comment_date_time,
    user_id: user_id,
    answer_id: answer_id,
    question_id: question_id,
    upvotes: upvotes,
  });
  return comment.save();
}
function tagCreate(name) {
  let tag = new Tag({ name: name });
  return tag.save();
}

function answerCreate(text, ans_by, ans_date_time, user_id, question_id) {
  let answerdetail = {
    text: text,
    ans_by: ans_by,
    ans_date_time: ans_date_time,
    user_id: user_id,
    question_id: question_id,
  };
  let answer = new Answer(answerdetail);
  return answer.save();
}

function questionCreate(title, text, tags, answers, asked_by, views, user_id) {
  let q = new Question({
    title: title,
    text: text,
    tags: tags,
    asked_by: asked_by,
    answers: answers,
    ask_date_time: Date.now(),
    views: views,
    user_id: user_id,
  });
  return q.save();
}
const populate = async () => {
  let hashed = "";
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(adminPassword, salt, function (err, hash) {
      hashed = hash;
      let user = new User({
        username: adminUsername,
        email: adminUsername,
        password: hashed,
        reputation: 50,
        join_date: Date.now(),
        answers: [],
        questions: [],
        isAdmin: true,
      });
      user.save();
    });
  });
  //answers, questions, comments
  let u1 = await userCreate("u1", "u1@gmail.com", "password1", [], [], []);
  let u2 = await userCreate("u2", "u2@gmail.com", "password2", [], [], []);
  let u3 = await userCreate("u3", "u3@gmail.com", "password3", [], [], []);
  let u4 = await userCreate("u4", "u4@gmail.com", "password4", [], [], []);

  let t1 = await tagCreate("t1");
  let t2 = await tagCreate("t2");
  let t3 = await tagCreate("t3");
  let t4 = await tagCreate("t4");
  let t5 = await tagCreate("t5");
  let t6 = await tagCreate("t5");
  let t7 = await tagCreate("t5");

  //tags, answers
  let q1 = await questionCreate(
    "q1",
    "expansion for q1",
    [t1, t2, t3],
    [],
    u1.username,
    10,
    u1._id
  );
  let q2 = await questionCreate(
    "q2",
    "expansion for q2",
    [t4, t5, t6],
    [],
    u1.username,
    10,
    u1._id
  );

  let q3 = await questionCreate(
    "q3",
    "expansion for q3",
    [t6, t7],
    [],
    u2.username,
    10,
    u2._id
  );
  let q4 = await questionCreate(
    "q4",
    "expansion for q4",
    [t4, t5],
    [],
    u2.username,
    10,
    u2._id
  );
  let q5 = await questionCreate(
    "q5",
    "expansion for q5",
    [t1, t3, t5],
    [],
    u2.username,
    10,
    u2._id
  );
  let q6 = await questionCreate(
    "q6",
    "expansion for q6",
    [t4, t7],
    [],
    u2.username,
    10,
    u2._id
  );

  let q7 = await questionCreate(
    "q7",
    "expansion for q7",
    [t5, t6],
    [],
    u3.username,
    10,
    u3._id
  );

  //uid, qid
  let a1 = await answerCreate("a1", u1.username, Date.now(), u1._id, q3._id);
  await Question.updateOne({ _id: q3._id }, { $push: { answers: a1 } });
  let a2 = await answerCreate("a2", u1.username, Date.now(), u1._id, q4._id);
  await Question.updateOne({ _id: q4._id }, { $push: { answers: a2 } });
  let a3 = await answerCreate("a3", u1.username, Date.now(), u1._id, q5._id);
  await Question.updateOne({ _id: q5._id }, { $push: { answers: a3 } });
  await User.updateOne({ _id: u1._id }, { $set: { $questions: [a1, a2, a3] } });

  let a4 = await answerCreate("a4", u2.username, Date.now(), u2._id, q1._id);
  await Question.updateOne({ _id: q1._id }, { $push: { answers: a4 } });
  let a5 = await answerCreate("a5", u2.username, Date.now(), u2._id, q2._id);
  await Question.updateOne({ _id: q2._id }, { $push: { answers: a5 } });
  let a6 = await answerCreate("a6", u2.username, Date.now(), u2._id, q7._id);
  await Question.updateOne({ _id: q7._id }, { $push: { answers: a6 } });
  let a7 = await answerCreate("a7", u2.username, Date.now(), u2._id, q3._id);
  await Question.updateOne({ _id: q3._id }, { $push: { answers: a7 } });
  await User.updateOne(
    { _id: u2._id },
    { $set: { $questions: [a4, a5, a6, a7] } }
  );
  let a8 = await answerCreate("a8", u3.username, Date.now(), u3._id, q4._id);
  await Question.updateOne({ _id: q4._id }, { $push: { answers: a8 } });
  let a9 = await answerCreate("a9", u3.username, Date.now(), u3._id, q6._id);
  await Question.updateOne({ _id: q6._id }, { $push: { answers: a9 } });
  await User.updateOne({ _id: u3._id }, { $set: { questions: [a8, a9] } });

  let a11 = await answerCreate("a10", u4.username, Date.now(), u4._id, q1._id);
  await Question.updateOne({ _id: q1._id }, { $push: { answers: a11 } });
  let a12 = await answerCreate("a11", u4.username, Date.now(), u4._id, q6._id);
  await Question.updateOne({ _id: q6._id }, { $push: { answers: a12 } });
  let a13 = await answerCreate("a12", u4.username, Date.now(), u4._id, q7._id);
  await Question.updateOne({ _id: q7._id }, { $push: { answers: a13 } });

  await User.updateOne(
    { _id: u4._id },
    { $set: { questions: [a11, a12, a13] } }
  );

  //uid, aid, qid
  let c11 = await commentCreate(
    "c1.1",
    u1.username,
    Date.now(),
    u1._id,
    a1._id,
    "",
    2
  );
  await User.updateOne({ id: u1._id }, { $push: { comments: c11 } });
  await Answer.updateOne({ id: a1._id }, { $push: { comments: c11 } });
  let c12 = await commentCreate(
    "c1.2",
    u1.username,
    Date.now(),
    u1._id,
    a2._id,
    "",
    3
  );
  await User.updateOne({ id: u1._id }, { $push: { comments: c12 } });
  await Answer.updateOne({ id: a2._id }, { $push: { comments: c12 } });
  let c13 = await commentCreate(
    "c1.3",
    u1.username,
    Date.now(),
    u1._id,
    "",
    q1._id,
    4
  );
  await User.updateOne({ id: u1._id }, { $push: { comments: c13 } });
  await Question.updateOne({ id: q1._id }, { $push: { comments: c13 } });
  let c21 = await commentCreate(
    "c2.1",
    u2.username,
    Date.now(),
    u2._id,
    "",
    q1._id,
    3
  );
  await User.updateOne({ id: u2._id }, { $push: { comments: c21 } });
  await Question.updateOne({ id: q1._id }, { $push: { comments: c21 } });
  let c22 = await commentCreate(
    "c2.2",
    u2.username,
    Date.now(),
    u2._id,
    a1._id,
    "",
    4
  );
  await User.updateOne({ id: u2._id }, { $push: { comments: c22 } });
  await Answer.updateOne({ id: a1._id }, { $push: { comments: c22 } });
  let c31 = await commentCreate(
    "c3.1",
    u3.username,
    Date.now(),
    u3._id,
    "",
    q1._id,
    3
  );
  await User.updateOne({ id: u3._id }, { $push: { comments: c31 } });
  await Question.updateOne({ id: q1._id }, { $push: { comments: c31 } });
  let c32 = await commentCreate(
    "c3.2",
    u3.username,
    Date.now(),
    u3._id,
    "",
    q2._id,
    3
  );
  await User.updateOne({ id: u3._id }, { $push: { comments: c32 } });
  await Question.updateOne({ id: q2._id }, { $push: { comments: c32 } });
  let c33 = await commentCreate(
    "c3.3",
    u3.username,
    Date.now(),
    u3._id,
    "",
    q3._id,
    3
  );
  await User.updateOne({ id: u3._id }, { $push: { comments: c33 } });
  await Question.updateOne({ id: q3._id }, { $push: { comments: c33 } });
  let c34 = await commentCreate(
    "c3.4",
    u3.username,
    Date.now(),
    u3._id,
    "",
    q1._id,
    10
  );
  await User.updateOne({ id: u3._id }, { $push: { comments: c34 } });
  await Question.updateOne({ id: q1._id }, { $push: { comments: c34 } });

  if (db) db.close();
  console.log("done");
};

populate().catch((err) => {
  console.log("ERROR: " + err);
  if (db) db.close();
});

console.log("processing ...");
