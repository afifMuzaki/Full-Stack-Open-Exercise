/* eslint-disable @stylistic/js/indent */
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IndexContext } from "../../context/IndexContext";
import blogService from "../../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showMessage, findAndUpdateBlog, findAndAddComment } from "../../utils";

const Blog = () => {
  const { authUser } = useContext(IndexContext);
  const { blogs } = useContext(IndexContext);
  const { message } = useContext(IndexContext);
  const blogId = useParams().id;
  const blog = blogs.find((blog) => blog.id === blogId);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteBlog = useMutation({
    mutationFn: blogService.destroy,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((blog) => blog.id !== blogId),
      );
      showMessage(
        {
          type: "success",
          text: `Blog ${blog.title} by ${blog.author} deleted`,
        },
        5,
        message.dispatch,
      );
    },
    onError: (err) => {
      showMessage(
        { type: "error", text: err.response.data.error },
        5,
        message.dispatch,
      );
    },
  });

  const updateBlog = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        findAndUpdateBlog(blogs, updatedBlog),
      );
      showMessage(
        {
          type: "success",
          text: `Blog ${updatedBlog.title} by ${updatedBlog.author} liked`,
        },
        5,
        message.dispatch,
      );
    },
    onError: (err) => {
      showMessage(
        { type: "error", text: err.response.data.error },
        5,
        message.dispatch,
      );
    },
  });

  const addComment = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: (addedComment) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        findAndAddComment(blogs, addedComment),
      );
    },
    onError: (err) => {
      showMessage(
        { type: "error", text: err.response.data.error },
        5,
        message.dispatch,
      );
    },
  });

  const handleLike = () => {
    const blogData = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    updateBlog.mutate({ blogData, blogId: blog.id });
  };

  const handleDelete = (blogId, title, author) => {
    const confirm = window.confirm(`Remove blog ${title} by ${author}?`);

    if (confirm) {
      deleteBlog.mutate(blogId);
      navigate("/");
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    addComment.mutate({ blogId: blog.id, comment: { comment } });
    setComment("");
  };

  if (!blog) return null;

  return (
    <div>
      <h4 className="title is-4 mb-1">
        {`${blog.title} by ${blog.author}`}
        {authUser.loggedUser.id === blog.user ||
        authUser.loggedUser.id === blog.user.id ? (
          <button
            onClick={() => handleDelete(blog.id, blog.title, blog.author)}
            className="button is-danger is-small ml-3"
          >
            delete
          </button>
        ) : null}
      </h4>
      <div>
        <a href="" target="_blank">
          {blog.url}
        </a>
      </div>
      <div className="is-flex is-align-items-center p-0">
        <span className="mr-2">{blog.likes} likes</span>
        <button onClick={handleLike} className="button is-link is-small">
          likes
        </button>
      </div>
      <div>added by {blog.user.name}</div>

      <form onSubmit={handleComment} className="column is-half p-0 mb-3">
        <div className="field">
          <label className="label mb-1">Comments</label>
          <div className="control mb-2">
            <input
              className="input"
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </div>
          <button type="submit" className="button is-link is-small">
            add comment
          </button>
        </div>
      </form>

      {blog.comments.length < 1 ? (
        <p>no comments</p>
      ) : (
        <>
          {blog.comments.map((comment) => (
            <div className="card" key={comment.id}>
              <div className="card-content">
                <div className="content">
                  <p>{comment.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Blog;
