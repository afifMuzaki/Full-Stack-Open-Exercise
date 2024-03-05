const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const jwt = require('jsonwebtoken');
const Blog = require("../models/blog");
const User = require("../models/user");
const app = require("../app");
const mongoose = require("mongoose");

const api = supertest(app);

describe("user initialization", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const userInit = {
            username: "jhon123",
            name: "Jhon Doe",
            password: "mypassword",
        };

        await api.post('/api/users')
            .send(userInit);
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
});

describe("when there is initially some blogs saved", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        const user = await User.findOne({ username: "jhon123" });

        const initialBlogs = [
            {
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
                user: user._id
            },
            {
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
                user: user._id
            },
            {
                title: "Blog to delete",
                author: "Jhon Doe",
                url: "example.com/blog-to-delete",
                likes: 1,
                user: user._id
            },
        ];

        const blogObjects = initialBlogs
            .map(blog => new Blog(blog));
        const promiseArray = blogObjects.map(blog => blog.save());
        await Promise.all(promiseArray);
    });

    test("blogs returned as json", async () => {
        const user = {
            username: "jhon123",
            password: "mypassword",
        };

        const loginUser = await api.post('/api/login')
            .set("Content-Type", "application/json")
            .send(user);

        await api.get("/api/blogs")
            .set("Authorization", `Bearer ${loginUser.body.token}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("unique identifier property of the blog posts should be named id", async () => {
        const user = {
            username: "jhon123",
            password: "mypassword",
        };

        const loginUser = await api.post('/api/login')
            .set("Content-Type", "application/json")
            .send(user);

        const result = await api.get("/api/blogs")
            .set("Authorization", `Bearer ${loginUser.body.token}`)
            .set("Content-Type", "application/json");

        const validIdentifier = result.body.every(blog => blog.hasOwnProperty("id"));
        assert(validIdentifier);
    });

    describe("addition of a new blog", () => {
        test("successfully adding a new blog post", async () => {
            const user = {
                username: "jhon123",
                password: "mypassword",
            };

            const loginUser = await api.post('/api/login')
                .set("Content-Type", "application/json")
                .send(user);

            const newPost = {
                title: "Lorem ipsum dolor",
                author: "Jhon Doe",
                url: "https://example.com/",
                likes: 4
            }

            const currentBlogs = await Blog.countDocuments({});

            await api.post("/api/blogs")
                .send(newPost)
                .set("Authorization", `Bearer ${loginUser.body.token}`)
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

        test("fails with status code 401 if token is invalid", async () => {
            const invalidToken = jwt.sign({ username: "jhon123" }, process.env.SECRET);

            const blogWithInvalidToken = {
                title: "Blog With Invalid Token",
                author: "Jhon Doe",
                url: "https://example.com/",
                likes: 4
            }

            await api.post("/api/blogs")
                .send(blogWithInvalidToken)
                .set("Authorization", `Bearer ${invalidToken}`)
                .set("Content-Type", "application/json")
                .expect(401);
        });
    });

    describe("missing properties", () => {
        test("if request's likes property is missing, set it to 0", async () => {
            const user = {
                username: "jhon123",
                password: "mypassword",
            };

            const loginUser = await api.post('/api/login')
                .set("Content-Type", "application/json")
                .send(user);

            const postWithoutLikes = {
                title: "Blog whitout likes property",
                author: "Jhon Doe",
                url: "https://example.com/jhon-doe/no-likes",
            };

            const blog = await api.post("/api/blogs")
                .send(postWithoutLikes)
                .set("Content-Type", "application/json")
                .set("Authorization", `Bearer ${loginUser.body.token}`);

            assert.strictEqual(blog._body.likes, 0);
        });

        test("if request's title or url property is missing, return status code 400 bad request", async () => {
            const user = {
                username: "jhon123",
                password: "mypassword",
            };

            const loginUser = await api.post('/api/login')
                .set("Content-Type", "application/json")
                .send(user);

            const postWithoutUrl = {
                title: "Blog whitout url property",
                author: "Jhon Doe",
            };

            await api.post("/api/blogs")
                .send(postWithoutUrl)
                .set("Content-Type", "application/json")
                .set("Authorization", `Bearer ${loginUser.body.token}`)
                .expect(400);
        });
    });

    describe("deletion of a blog", () => {
        test("succeeds with status code 204 if id is valid", async () => {
            const user = {
                username: "jhon123",
                password: "mypassword",
            };

            const loginUser = await api.post('/api/login')
                .set("Content-Type", "application/json")
                .send(user);

            const blog = await Blog.findOne({ title: "Blog to delete" });

            await api.delete(`/api/blogs/${blog._id.toString()}`)
                .set("Content-Type", "application/json")
                .set("Authorization", `Bearer ${loginUser.body.token}`)
                .expect(204);
        });
    });

    describe("update an existing blog", () => {
        test("succeeds with status code 200 if id is valid", async () => {
            const user = {
                username: "jhon123",
                password: "mypassword",
            };

            const loginUser = await api.post('/api/login')
                .set("Content-Type", "application/json")
                .send(user);

            const blog = await Blog.findOne({ title: "React patterns" });

            const newBlogUpdate = {
                title: "Updated Blog",
                author: "Jhon Doe",
                url: "https://example.com/jhon-doe/updated-blog",
                likes: 9
            }

            await api.put(`/api/blogs/${blog._id.toString()}`)
                .send(newBlogUpdate)
                .set("Content-Type", "application/json")
                .set("Authorization", `Bearer ${loginUser.body.token}`)
                .expect(200);
        });
    });
});

after(async () => {
    await mongoose.connection.close();
});