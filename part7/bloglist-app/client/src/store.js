import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./reducers/messageReducer";
import blogReducer from "./reducers/blogReducer";
import authReducer from "./reducers/authReducer";
import usersReducer from "./reducers/usersReducer";

const store = configureStore({
  reducer: {
    message: messageReducer,
    blogs: blogReducer,
    loggedUser: authReducer,
    users: usersReducer,
  },
});

export default store;
