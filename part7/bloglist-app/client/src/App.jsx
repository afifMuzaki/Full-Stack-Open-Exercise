import { useEffect } from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "./reducers/blogReducer";
import { initialUser, userLogout } from "./reducers/authReducer";
import { fetchUsers } from "./reducers/usersReducer";
import User from "./components/pages/User";
import LoginForm from "./components/LoginForm";
import FlashMessage from "./components/FlashMessage";
import Home from "./components/pages/Home";
import Users from "./components/pages/Users";

const App = () => {
  const dispatch = useDispatch();
  const match = useMatch("/users/:id");
  const loggedUser = useSelector((state) => state.loggedUser);
  const users = useSelector((state) => state.users);
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(initialUser());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(userLogout());
  };

  if (loggedUser === null) return <LoginForm />;

  return (
    <>
      <h2>blogs</h2>
      <FlashMessage />
      <p>{loggedUser.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={user} />} />
      </Routes>
    </>
  );
};

export default App;
