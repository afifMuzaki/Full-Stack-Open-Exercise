export const showMessage = (message, duration, dispatch) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: message,
  });

  setTimeout(() => {
    dispatch({
      type: "REMOVE_MESSAGE",
    });
  }, duration * 1000);
};
