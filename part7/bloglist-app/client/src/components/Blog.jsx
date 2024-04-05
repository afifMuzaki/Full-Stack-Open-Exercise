import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [visibility, setVisibility] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleUpdate = (newBlog, blogId) => {
    dispatch(likeBlog(newBlog, blogId));
  };

  const handleDelete = (blogId, title, author) => {
    const confirm = window.confirm(`Remove blog ${title} by ${author}?`);

    if (confirm) {
      dispatch(deleteBlog(blogId, title, author));
    }
  };

  const handleLike = () => {
    const blogData = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    handleUpdate(blogData, blog.id);
  };

  const removeBtnStyle = {
    display: blog.user.id === user.id || blog.user === user.id ? "" : "none",
    backgroundColor: "blue",
    color: "white",
  };
  const hideWhenVisible = { display: visibility ? "none" : "" };
  const showWhenVisible = { display: visibility ? "" : "none" };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility} className="viewBtn">
          view
        </button>
      </div>
      <div style={showWhenVisible} className="blogDetails">
        {blog.title} <button onClick={toggleVisibility}>hide</button>
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes <span data-testid="likes">{blog.likes}</span>{" "}
        <button onClick={handleLike} className="likeBtn">
          like
        </button>
        <br />
        {blog.author}
        <br />
        <button
          style={removeBtnStyle}
          onClick={() => handleDelete(blog.id, blog.title, blog.author)}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
