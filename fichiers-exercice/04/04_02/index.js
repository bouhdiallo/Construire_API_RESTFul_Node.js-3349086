const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models");
const app = express();
const data = require("./posts");
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (e) {
    res.send(e);
  }
});

app.post("/posts/create", (req, res) => {
  try {
    const post = new Post(req.body);
    post.save();
    res.send("new post successfully added");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  mongoose.connect("mongodb://127.0.0.1:27017/database").then(() => {
    console.log("successfully connected to the database");
  });
});