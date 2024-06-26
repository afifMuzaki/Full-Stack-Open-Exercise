const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments");
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const reqUser = req.user;

  if (!req.body.title || !req.body.url)
    return res.status(400).json({ error: "Title or URL not defined" });

  if (!reqUser || !reqUser.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(reqUser.id);

  const newRequest = !req.body.likes
    ? { ...req.body, likes: 0, user: user.id }
    : { ...req.body, user: user.id };

  const blog = new Blog(newRequest);
  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  res.status(201).json(result);
});

blogRouter.delete("/:id", async (req, res) => {
  const reqUser = req.user;
  const id = req.params.id;

  // const blog = await Blog.findById(id);
  // || blog.user.toString() !== reqUser.id.toString()
  if (!reqUser) {
    return res.status(401).json({ error: "token invalid" });
  }

  await Comment.deleteMany({ blog: id })
  const result = await Blog.findOneAndDelete({ _id: id });
  res.status(204).json(result);
});

blogRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });
  res.status(200).json(updatedBlog);
});

module.exports = blogRouter;
