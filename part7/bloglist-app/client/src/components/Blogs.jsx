import Blog from "./Blog";
import { useSelector } from "react-redux";

const Blogs = () => {
  const blogs = [...useSelector((state) => state.blogs)];

  if (blogs.length < 1) return <p>no saved blogs yet</p>;

  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  );
};

export default Blogs;
