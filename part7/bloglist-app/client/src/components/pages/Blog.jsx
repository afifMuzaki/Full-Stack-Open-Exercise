import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { likeBlog, blogComment, deleteBlog } from "../../reducers/blogReducer";
import { useNavigate, useParams } from "react-router-dom";

const Blog = () => {
  // const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const blogs = useSelector((state) => state.blogs);
  const blogId = useParams().id;
  const blog = blogs.find((blog) => blog.id === blogId);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleUpdate = (newBlog, blogId) => {
    dispatch(likeBlog(newBlog, blogId));
  };

  const handleDelete = (blogId, title, author) => {
    const confirm = window.confirm(`Remove blog ${title} by ${author}?`);

    if (confirm) {
      dispatch(deleteBlog(blogId, title, author));
      navigate("/");
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

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(blogComment(blog.id, { comment }));
    setComment("");
  };

  if (!blog) return null;

  return (
    <div>
      <h4 className="title is-4 mb-1">
        {`${blog.title} by ${blog.author}`}
        {loggedUser.id === blog.user || loggedUser.id === blog.user.id ? (
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
