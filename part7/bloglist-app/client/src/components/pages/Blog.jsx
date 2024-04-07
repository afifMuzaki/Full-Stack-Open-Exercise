import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../../reducers/blogReducer";
import { useParams } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const blogId = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === blogId);

  const handleUpdate = (newBlog, blogId) => {
    dispatch(likeBlog(newBlog, blogId));
  };

  // const handleDelete = (blogId, title, author) => {
  //   const confirm = window.confirm(`Remove blog ${title} by ${author}?`);

  //   if (confirm) {
  //     dispatch(deleteBlog(blogId, title, author));
  //   }
  // };

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

  if (!blog) return null;

  return (
    <div>
      <h2>{`${blog.title} ${blog.author}`}</h2>
      <div>
        <a href="" target="_blank">
          {blog.url}
        </a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>likes</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  );
};

export default Blog;
