import { Routes, Route, Navigate } from "react-router-dom";
import User from "./components/pages/User";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm";
import FlashMessage from "./components/FlashMessage";
import Home from "./components/pages/Home";
import Users from "./components/pages/Users";
import Blog from "./components/pages/Blog";
import { useContext } from "react";
import { IndexContext } from "./context/IndexContext";

const App = () => {
  const { authUser } = useContext(IndexContext);
  if (!authUser.loggedUser) return <LoginForm />;

  return (
    <div>
      <Navigation />
      <div className="container my-2">
        <FlashMessage />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/" element={<Navigate replace to="/" />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
