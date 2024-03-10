import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import FlashMessage from "./components/FlashMessage";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await blogService.getAll();
      setBlogs(response);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const blogFormRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      blogService.setToken(user.token);
      localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      setMessage({ type: "error", text: "wrong username or password" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleCreate = async ({ title, author, url }) => {
    try {
      blogFormRef.current.toggleVisibility();
      const response = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(response));

      setMessage({ type: "success", text: `a new blog ${title} by ${author} added` });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (err) {
      setMessage({ type: "error", text: err.response.data.error });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
  };

  if (user === null) {
    return <LoginForm
      handleLogin={handleLogin}
      password={password}
      username={username}
      setPassword={setPassword}
      setUsername={setUsername}
      message={message}
    />
  }

  return (
    <div>
      <h2>blogs</h2>
      <FlashMessage message={message} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable bottonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          handleCreate={handleCreate}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
}

export default App