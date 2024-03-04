const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
    if (!req.body.title || !req.body.url) return res.status(400).json({ error: 'Title or URL not defined' });

    const users = await User.find({});
    const randNum = Math.floor(Math.random() * users.length);

    const newRequest = (!req.body.likes) ?
        { ...req.body, likes: 0, user: users[randNum].id }
        : { ...req.body, user: users[randNum].id };

    const blog = new Blog(newRequest);
    const result = await blog.save();

    users[randNum].blogs = users[randNum].blogs.concat(result._id);
    await users[randNum].save();
    
    res.status(201).json(result);
});

blogRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Blog.findByIdAndDelete(id);
    res.status(204).json(result);
});

blogRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json(updatedBlog);
});

module.exports = blogRouter;