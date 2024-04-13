import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import Togglable from "./Togglable";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createBlog({ title, author, url }));
    blogFormRef.current.toggleVisibility();
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <Togglable title="Blog List" bottonLabel="new blog" ref={blogFormRef}>
      <h4 className="title is-4 mb-1">Create New</h4>
      <div className="columns mb-0">
        <form onSubmit={handleCreate} className="column is-half">
          <div className="field">
            <label htmlFor="title" className="label">
              title
            </label>
            <div className="control">
              <input
                id="title"
                className="input"
                placeholder="title"
                data-testid="title"
                type="text"
                name="title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="author" className="label">
              author
            </label>
            <input
              id="author"
              className="input"
              placeholder="author"
              data-testid="author"
              type="text"
              name="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="url" className="label">
              url
            </label>
            <input
              id="url"
              className="input"
              placeholder="url"
              data-testid="url"
              type="text"
              name="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit" className="button is-link is-small">
            create
          </button>
        </form>
      </div>
    </Togglable>
  );
};

export default BlogForm;
