import { useEffect } from "react";
import { Routes, Route, useMatch, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "./reducers/blogReducer";
import { initialUser } from "./reducers/authReducer";
import { fetchUsers } from "./reducers/usersReducer";
import User from "./components/pages/User";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm";
import FlashMessage from "./components/FlashMessage";
import Home from "./components/pages/Home";
import Users from "./components/pages/Users";
import Blog from "./components/pages/Blog";

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

  if (!loggedUser) return <LoginForm />;

  return (
    <>
      <Navigation />
      <h2>blog app</h2>
      <FlashMessage />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/blogs/" element={<Navigate replace to="/" />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </>
  );
};

export default App;
