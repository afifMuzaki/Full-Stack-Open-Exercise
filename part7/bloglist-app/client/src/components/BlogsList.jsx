import { useContext } from "react";
import { Link } from "react-router-dom";
import { IndexContext } from "../context/IndexContext";

const BlogsList = () => {
  const { blogs } = useContext(IndexContext);

  if (blogs.length < 1) return <p>no saved blogs yet</p>;

  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Link
            key={blog.id}
            className="button is-link is-outlined is-block mb-1"
            to={`/blogs/${blog.id}`}
          >
            {blog.title}
          </Link>
        ))}
    </>
  );
};

export default BlogsList;
