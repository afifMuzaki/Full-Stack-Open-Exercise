import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "./reducers/blogReducer";
import { initialUser, userLogout } from "./reducers/userReducer";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import FlashMessage from "./components/FlashMessage";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(initialUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(userLogout());
  };

  if (user === null) return <LoginForm />;

  return (
    <div>
      <h2>blogs</h2>
      <FlashMessage />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm />
      <Blogs />
    </div>
  );
};

export default App;
