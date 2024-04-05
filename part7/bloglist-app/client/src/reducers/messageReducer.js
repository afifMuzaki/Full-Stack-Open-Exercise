import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: "",
  reducers: {
    showMessage: (state, action) => {
      return action.payload;
    },

    removeMessage: (state, action) => {
      return "";
    },
  },
});

export const setMessage = (message, duration) => {
  return (dispatch) => {
    dispatch(showMessage(message));

    setTimeout(() => {
      dispatch(removeMessage());
    }, duration * 1000);
  };
};

export const { showMessage, removeMessage } = messageSlice.actions;
export default messageSlice.reducer;
