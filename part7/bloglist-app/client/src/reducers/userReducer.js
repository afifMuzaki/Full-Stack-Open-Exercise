import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setMessage } from "./messageReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const initialUser = () => {
  return (dispatch) => {
    const loggedUserJSON = localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const userLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
      blogService.setToken(user.token);
      localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch (err) {
      console.log(err);
      dispatch(
        setMessage({ type: "error", text: "wrong username or password" }, 5),
      );
    }
  };
};

export const userLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("loggedUser");
    dispatch(setUser(null));
  };
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
