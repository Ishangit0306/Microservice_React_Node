const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(cors());
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
  console.log(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "post created") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }
  if (type === "comment created") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content });
  }
  if (type === "comment updated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment= post.comments.find((comment) => {
      return comment.id === id;
    });
  
comment.status = status;
 comment.content = content;
  }
  res.send({});
});

app.listen(4002, () => {
  console.log("listening to 4002");
});
