// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
let Questions = require("./models/questions");
let Tags = require("./models/tags");
let Answers = require("./models/answers");
let Users = require("./models/users");
let Comments = require("./models/comments");
const express = require("express");
const session = require("express-session");
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");
const port = 8000;
const mongoDB = "mongodb://127.0.0.1:27017/fake_so";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    // For simplicity the secret is hard-coded. Ideally should be read from environment variables.
    secret: "secret session",
    cookie: {},
    resave: false,
    saveUninitialized: false,
  })
);
app.get("/", (req, res) => {
  if (req.session.username && req.session.email) {
    res.send({ status: true });
  }
  res.send({ status: false });
});

app.post("/addquestion", async (req, res) => {
  let tags = [];
  for (let i = 0; i < req.body.tags.length; i++) {
    if (req.body.tags[i].add == true) {
      let tag = new Tags({ name: req.body.tags[i].name });
      await tag.save();
    }
    tags.push(req.body.tags[i].name);
  }
  let final = [];
  for (let i = 0; i < tags.length; i++) {
    let tag = await Tags.findOne({ name: tags[i] });
    final.push(tag);
  }
  qstndetail = {
    title: req.body.title,
    text: req.body.text,
    tags: final,
    asked_by: req.body.askedBy,
    answers: req.body.ansIds,
    ask_date_time: req.body.askDate,
    views: req.body.views,
    user_id: req.body.uid,
  };
  let qstn = new Questions(qstndetail);
  res.send(qstn.save());
});
app.get("/getuser/:email", async (req, res) => {
  let r = await Users.find({ email: req.params.email });
  res.send(r);
});
app.get("/getuseruid/:uid", async (req, res) => {
  let r = await Users.find({ _id: req.params.uid });
  res.send(r);
});
app.post("/removeuser/:uid", async (req, res) => {
  let r = await Users.findOne({ _id: req.params.uid }).then(async (res) => {
    for (let i = 0; i < res.comments.length; i++) {
      await Comments.deleteOne({ _id: res.comments[i]._id });
      await Questions.updateOne(
        { _id: res.comments[i].question_id },
        { $pull: { comments: { _id: res.comments[i]._id } } }
      );
    }
    for (let i = 0; i < res.answers.length; i++) {
      await Answers.deleteOne({ _id: res.answers[i]._id });
      await Questions.updateOne(
        { _id: res.answers[i].question_id },
        { $pull: { answers: { _id: res.answers[i]._id } } }
      );
    }
    for (let i = 0; i < res.questions.length; i++) {
      await Questions.deleteOne({ _id: res.questions[i]._id });
    }
    await Users.deleteOne({ _id: req.params.uid });
  });
  res.send(r);
});
app.post("/removetag/:tid", async (req, res) => {});
app.post("/addanswer", async (req, res) => {
  let answer = {
    text: req.body.text,
    ans_by: req.body.ans_by,
    ans_date_time: req.body.ans_date,
    user_id: req.body.uid,
    question_id: req.body.qid,
  };
  let ans = new Answers(answer);
  await ans.save();
  await Questions.updateOne({ _id: req.body.qid }, { $push: { answers: ans } });
  await Users.updateOne({ _id: req.body.uid }, { $push: { answers: ans } });
  res.send(ans);
});
app.post("/addanswer/:qid/:aid", async (req, res) => {
  let question = await Answers.findOne({ _id: req.params.aid });
});
app.post("/upvotecomment", async (req, res) => {
  await Comments.updateOne(
    { _id: req.body.id },
    { $set: { upvotes: req.body.upvotes } }
  ).then(() => {
    res.send({ error: false });
  });
});
app.post("/voteanswer", async (req, res) => {
  await Users.findOne({ _id: req.body.uid }).then(async (user) => {
    if (user.reputation < 50) {
      res.send({ error: true });
    } else {
      await Answers.updateOne(
        { _id: req.body.id },
        { $set: { upvotes: req.body.upvotes } }
      ).then(async () => {
        await Answers.findOne({ _id: req.body.id }).then(async (re) => {
          const commenter = re.user_id;
          if (req.body.positive == true) {
            await Users.updateOne(
              { _id: commenter },
              { $inc: { reputation: 10 } }
            );
            res.send({ error: false });
          } else {
            await Users.updateOne(
              { _id: commenter },
              { $inc: { reputation: -10 } }
            );
            res.send({ error: false });
          }
        });
      });
    }
  });
});
app.post("/votequestion", async (req, res) => {
  await Users.findOne({ _id: req.body.uid }).then(async (user) => {
    if (user.reputation < 50) {
      user.send({ error: true });
    } else {
      await Questions.updateOne(
        { _id: req.body.id },
        { $set: { upvotes: req.body.upvotes } }
      ).then(async () => {
        await Questions.findOne({ _id: req.body.id }).then(async (re) => {
          const commenter = re.user_id;
          if (req.body.positive == true) {
            await Users.updateOne(
              { _id: commenter },
              { $inc: { reputation: 10 } }
            );
            res.send({ error: false });
          } else {
            await Users.updateOne(
              { _id: commenter },
              { $inc: { reputation: -10 } }
            );
            res.send({ error: false });
          }
        });
      });
    }
  });
});
app.post("/addcomment", async (req, res) => {
  let comment = new Comments({
    text: req.body.text,
    comment_by: req.body.username,
    comment_date_time: Date.now(),
    user_id: req.body.uid,
    question_id: req.body.qid,
    answer_id: req.body.aid,
  });
  await comment.save();
  await Users.updateOne(
    { _id: req.body.uid },
    { $push: { comments: comment } }
  );
  if (req.body.qid === "") {
    await Answers.updateOne(
      { _id: req.body.aid },
      { $push: { comments: comment } }
    );
  } else {
    await Questions.updateOne(
      { _id: req.body.qid },
      { $push: { comments: comment } }
    );
  }
  res.send(comment);
});
app.get("/users", async (req, res) => {
  let users = await Users.find();
  res.send(users);
});
app.post("/adduser", async (req, res) => {
  let user = new Users({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    reputation: 0,
    join_date: Date.now(),
    answers: [],
    questions: [],
    isAdmin: false,
  });
  console.log("lllk");
  req.session.username = req.body.username;
  req.session.email = req.body.email;
  res.send(await user.save());
});
app.get("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  req.session.username = req.body.username;
  req.session.email = req.body.email;
  res.send({});
});
app.post("/addtag", async (req, res) => {
  let tag = new Tags({ name: req.body.name });
  await tag.save();
  res.send(tag);
});
app.post("/addview/:qid", async (req, res) => {
  let question = await Questions.findOne({ _id: req.params.qid });
  let view = question.views + 1;
  await Questions.updateOne({ _id: req.params.qid }, { $set: { views: view } });
  question = await Questions.findOne({ _id: req.params.qid });
  res.sendStatus(200);
});
app.get("/question/:qid", async (req, res) => {
  let questions = await Questions.find({ _id: req.params.qid });
  res.send(questions);
});
app.get("/answer/:aid", async (req, res) => {
  let answers = await Answers.find({ _id: req.params.aid });
  res.send(answers);
});
app.get("/tag/:tid", async (req, res) => {
  let tags = await Tags.find({ _id: req.params.tid });
  res.send(tags);
});
app.get("/questions", async (req, res) => {
  let questions = await Questions.find();
  res.send(questions);
});
app.get("/answers", async (req, res) => {
  let answers = await Answers.find();
  res.send(answers);
});
app.get("/tags", async (req, res) => {
  let tags = await Tags.find();
  res.send(tags);
});
app.get("/comments", async (req, res) => {
  let comments = await Comments.find();
  res.send(comments);
});
app.get("/posts/question/:id", async (req, res) => {
  let tags = await Questions.find({ _id: req.params.id });
  res.send(tags);
});
app.get("/posts/answer/:id", async (req, res) => {
  let tags = await Answers.find({ _id: req.params.id });
  res.send(tags);
});
app.get("/posts/tag/:id", async (req, res) => {
  let tags = await Tags.find({ _id: req.params.id });
  res.send(tags);
});
async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("connected");
  db = mongoose.connection;
}
main().catch((err) => console.log(err));
app.listen(port, () => {
  console.log(`Server listerning on port: ${port}`);
});
process.on("SIGINT", function () {
  console.log("Server closed. Database instance disconnected");
  process.exit(0);
});
