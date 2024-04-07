import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogsList = () => {
  const blogs = [...useSelector((state) => state.blogs)];

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (blogs.length < 1) return <p>no saved blogs yet</p>;

  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </>
  );
};

export default BlogsList;
