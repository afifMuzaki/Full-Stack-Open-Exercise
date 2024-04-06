import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    usersInit: (state, action) => {
      return action.payload;
    },
  },
});

export const fetchUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(usersInit(users));
  };
};

export const { usersInit } = usersSlice.actions;
export default usersSlice.reducer;
