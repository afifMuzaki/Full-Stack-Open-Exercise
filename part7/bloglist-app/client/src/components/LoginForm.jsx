import { useContext, useState } from "react";
import FlashMessage from "./FlashMessage";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useMutation } from "@tanstack/react-query";
import { IndexContext } from "../context/IndexContext";
import { showMessage } from "../utils";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authUser, message } = useContext(IndexContext);

  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      blogService.setToken(user.token);
      localStorage.setItem("loggedUser", JSON.stringify(user));
      authUser.setLoggedUser(user);
    },
    onError: () => {
      showMessage(
        { type: "error", text: "wrong username or password" },
        5,
        message.dispatch,
      );
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      <h4 className="title is-4 has-text-centered">log in to application</h4>
      <FlashMessage />
      <div className="is-flex is-justify-content-center is-align-items-center mt-4">
        <form onSubmit={handleLogin} className="card p-4">
          <div className="field">
            <label className="label">Username</label>
            <input
              className="input is-small"
              type="text"
              data-testid="username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              className="input is-small"
              type="password"
              data-testid="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button className="button is-primary is-small my-3" type="submit">
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
