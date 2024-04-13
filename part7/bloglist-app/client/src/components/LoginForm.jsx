import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../reducers/authReducer";
import FlashMessage from "./FlashMessage";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin(username, password));
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
