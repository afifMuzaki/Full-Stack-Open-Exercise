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
    <>
      <h2>log in to application</h2>
      <FlashMessage />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            data-testid="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            data-testid="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
