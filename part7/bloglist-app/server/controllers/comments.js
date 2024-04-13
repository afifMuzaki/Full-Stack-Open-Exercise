const commentRouter = require("express").Router();
const Comment = require("../models/comment");
const Blog = require("../models/blog");

commentRouter.post("/:id/comments", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const comment = new Comment({
    comment: req.body.comment,
    blog: req.params.id,
  });
  const savedComment = await comment.save();
  
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  res.status(201).json(savedComment);
});

module.exports = commentRouter;
