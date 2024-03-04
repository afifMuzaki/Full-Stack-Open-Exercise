const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
// const Blog = require("../models/blog");
// const User = require("../models/user");
// const app = require("../app");
// const mongoose = require("mongoose");

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});

    const userInit = new User({
        username: "jhon123",
        name: "Jhon Doe",
        password: "mypassword",
    });

    await userInit.save();
});

describe('invalid users will not be created', () => {
    test('users with the same username will not be created', async () => {
        const duplicateUserName = {
            username: "jhon123",
            name: "Jhon Doe",
            password: "password",
        };

        await api.post('/api/users')
            .send(duplicateUserName)
            .expect(400)
            .expect(res => assert.strictEqual(res.body.error, 'expected `username` to be unique'));
    });

    test('users with invalid passwords will not be created', async () => {
        const invalidPassword = {
            username: "json_code",
            name: "Jason Smith",
            password: "pa",
        };

        await api.post('/api/users')
            .send(invalidPassword)
            .expect(400)
            .expect(res => assert.strictEqual(res.body.error, '`password` must be at least 3 characters long'));
    });
});

describe("when there is initially some blogs saved", () => {
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

    test("blogs returned as json", async () => {
        await api.get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("unique identifier property of the blog posts should be named id", async () => {
        const result = await api.get("/api/blogs");

        const validIdentifier = result.body.every(blog => blog.hasOwnProperty("id"));
        assert(validIdentifier);
    });

    describe("addition of a new blog", () => {
        test("successfully adding a new blog post", async () => {
            const newPost = {
                title: "Lorem ipsum dolor",
                author: "Jhon Doe",
                url: "https://example.com/",
                likes: 4
            }

            const currentBlogs = await Blog.countDocuments({});

            await api.post("/api/blogs")
                .send(newPost)
                .set("Content-Type", "application/json")
                .expect(201);

            const recentBlogs = await Blog.countDocuments({});

            assert.strictEqual(recentBlogs, (currentBlogs + 1));

            const latestBlog = await Blog.findOne({}).sort({ _id: -1 });

            assert.deepStrictEqual({
                title: latestBlog.title,
                author: latestBlog.author,
                url: latestBlog.url,
                likes: latestBlog.likes
            }, newPost);
        });
    });

    describe("missing properties", () => {
        test("if request's likes property is missing, set it to 0", async () => {
            const postWithoutLikes = {
                title: "Blog whitout likes property",
                author: "Jhon Doe",
                url: "https://example.com/jhon-doe/no-likes",
            };

            const blog = await api.post("/api/blogs")
                .send(postWithoutLikes);

            assert.strictEqual(blog._body.likes, 0);
        });

        test("if request's title or url property is missing, return status code 400 bad request", async () => {
            const postWithoutUrl = {
                title: "Blog whitout url property",
                author: "Jhon Doe",
            };

            await api.post("/api/blogs")
                .send(postWithoutUrl)
                .expect(400);
        });
    });

    describe("deletion of a blog", () => {
        test("succeeds with status code 204 if id is valid", async () => {
            const latestBlog = await Blog.findOne({}).sort({ _id: -1 });

            await api.delete(`/api/blogs/${latestBlog._id}`)
                .expect(204);
        });
    });

    describe("update an existing blog", () => {
        test("succeeds with status code 200 if id is valid", async () => {
            const latestBlog = await Blog.findOne({}).sort({ _id: -1 });

            const newBlogUpdate = {
                title: "Updated Blog",
                author: "Jhon Doe",
                url: "https://example.com/jhon-doe/updated-blog",
                likes: 9
            }

            await api.put(`/api/blogs/${latestBlog._id}`)
                .send(newBlogUpdate)
                .expect(200);
        });
    });
});

after(async () => {
    await mongoose.connection.close();
});