import { useState } from "react";

const Blog = ({ blog, handleUpdate, handleDelete }) => {
  const [visibility, setVisibility] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const likeBlog = () => {
    const blogData = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    handleUpdate(blogData, blog.id);
  };

  const deleteBlog = () => {
    handleDelete(blog.id, blog.title, blog.author);
  };

  const hideWhenVisible = { display: visibility ? "none" : "" };
  const showWhenVisible = { display: visibility ? "" : "none" }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>hide</button>
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes {blog.likes} <button onClick={likeBlog}>like</button>
        <br />
        {blog.author}
        <br />
        <button style={{ backgroundColor: "blue", color: "white" }} onClick={deleteBlog}>remove</button>
      </div>
    </div>
  );
};

export default Blog;