const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
    if (!req.body.title || !req.body.url) return res.status(400).json({ error: 'Title or URL not defined' });
    const newRequest = (!req.body.likes) ? { ...req.body, likes: 0 } : req.body;
    const blog = new Blog(newRequest);
    const result = await blog.save();
    res.status(201).json(result);
});

module.exports = blogRouter;