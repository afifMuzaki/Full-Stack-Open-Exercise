const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const Blog = require('../models/blog');
const app = require('../app');
const mongoose = require('mongoose');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    const initialBlogs = [
        {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7
        },
        {
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5
        },
    ];

    const blogObjects = initialBlogs
        .map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
});

describe('blogs as json', () => {
    test('blogs are returned as json', async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
});

describe('unique identifier', () => {
    test('unique identifier property of the blog posts is named id', async () => {
        const result = await api.get('/api/blogs');

        const validIdentifier = result.body.every(blog => blog.hasOwnProperty('id'));
        assert(validIdentifier);
    });
});

describe('create a new blog', () => {
    test('successfully create a new blog post', async () => {
        const newPost = {
            title: "Lorem ipsum dolor",
            author: "Jhon Doe",
            url: "https://example.com/",
            likes: 4
        }

        // Count the number of current blog posts
        const currentBlogs = await Blog.countDocuments({});

        // Post a new blog
        await api.post('/api/blogs')
            .send(newPost)
            .set('Content-Type', 'application/json')
            .expect(201);

        // Count the number of recent blog posts       
        const recentBlogs = await Blog.countDocuments({});
        // Checking whether recentBlogs equals (currentBlogs + 1)
        assert.strictEqual(recentBlogs, (currentBlogs + 1));

        // Get the latest blog posts
        const latestBlog = await Blog.findOne({}).sort({ _id: -1 });
        // Checking whether latestBlog equals newPost
        assert.deepStrictEqual({
            title: latestBlog.title,
            author: latestBlog.author,
            url: latestBlog.url,
            likes: latestBlog.likes
        }, newPost);
    });
});

describe('missing properties', () => {
    test('if request likes property is missing, set it to 0', async () => {
        const postWithoutLikes = {
            title: "Blog whitout likes property",
            author: "Jhon Doe",
            url: "https://example.com/jhon-doe/no-likes",
        };

        const blog = await api.post('/api/blogs')
            .send(postWithoutLikes);

        assert.strictEqual(blog._body.likes, 0);
    });

    test('if request title or url property are missing, return status code 400 bad request', async () => {
        const postWithoutUrl = {
            title: "Blog whitout url property",
            author: "Jhon Doe",
        };

        await api.post('/api/blogs')
            .send(postWithoutUrl)
            .expect(400);
    });
});

after(async () => {
    await mongoose.connection.close();
});